import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  args: [
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const runs = [];
for (const reduced of [true, false]) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  await session.send("Network.enable");
  await session.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    const metrics = {
      lcp: 0,
      cls: 0,
      longTasks: [],
      events: [],
      maxDrawCalls: 0,
      maxTriangles: 0,
    };
    window.__metrics = metrics;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) metrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (!e.hadRecentInput) metrics.cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) metrics.longTasks.push(e.duration);
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        if (e.interactionId) metrics.events.push(e.duration);
    }).observe({ type: "event", durationThreshold: 16, buffered: true });
    let calls = 0,
      triangles = 0;
    for (const Constructor of [WebGLRenderingContext, WebGL2RenderingContext])
      for (const method of ["drawElements", "drawArrays"]) {
        const original = Constructor.prototype[method];
        Constructor.prototype[method] = function (...args) {
          calls++;
          if (args[0] === 4)
            triangles += (method === "drawElements" ? args[1] : args[2]) / 3;
          return Reflect.apply(original, this, args);
        };
      }
    const frame = () => {
      metrics.maxDrawCalls = Math.max(metrics.maxDrawCalls, calls);
      metrics.maxTriangles = Math.max(metrics.maxTriangles, triangles);
      calls = 0;
      triangles = 0;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
  await page.goto("http://127.0.0.1:3000");
  if (!reduced)
    await page.waitForSelector('[data-enhancement="ready"]', {
      timeout: 30000,
    });
  await page.waitForTimeout(1500);
  await page
    .getByRole("group", { name: "Filter workstreams" })
    .getByRole("button", { name: "Build" })
    .click();
  await page
    .getByRole("group", { name: "Filter workstreams" })
    .getByRole("button", { name: "View all" })
    .click();
  await page.waitForTimeout(300);
  const result = await page.evaluate(() => ({
    metrics: window.__metrics,
    resources: performance
      .getEntriesByType("resource")
      .map((r) => ({
        name: new URL(r.name).pathname,
        encoded: r.encodedBodySize,
        transfer: r.transferSize,
        type: r.initiatorType,
      })),
    navigation: performance
      .getEntriesByType("navigation")
      .map((r) => ({ encoded: r.encodedBodySize, transfer: r.transferSize })),
    scene: document
      .querySelector("[data-enhancement]")
      ?.getAttribute("data-enhancement"),
  }));
  runs.push({ reducedMotion: reduced, ...result });
  await context.close();
}
await browser.close();
await mkdir("artifacts", { recursive: true });
await writeFile(
  "artifacts/performance.json",
  JSON.stringify(
    {
      conditions:
        "Chromium 134 Linux, 390x844, software WebGL, 4x CPU slowdown, 1.6 Mbps down / 750 Kbps up, 150 ms latency, fresh browser contexts; one sample per mode, local production server",
      runs,
    },
    null,
    2,
  ),
);
for (const run of runs)
  console.log(
    JSON.stringify({
      reducedMotion: run.reducedMotion,
      lcp: run.metrics.lcp,
      cls: run.metrics.cls,
      eventDurations: run.metrics.events,
      maxDrawCalls: run.metrics.maxDrawCalls,
      maxTriangles: run.metrics.maxTriangles,
      jsBytes: run.resources
        .filter((r) => r.name.endsWith(".js"))
        .reduce((s, r) => s + r.encoded, 0),
      fontBytes: run.resources
        .filter((r) => r.name.includes(".woff"))
        .reduce((s, r) => s + r.encoded, 0),
    }),
  );
