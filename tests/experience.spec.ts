import { test, expect } from "@playwright/test";
declare global {
  interface Window {
    __drawCounts: { draws: number };
  }
}

test("core narrative, stage choices, filters, reset and disclosures", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Make everycommunitymove visible.",
  );
  const stages = page.getByRole("group", { name: "Atlas stage" });
  await expect(
    stages.getByRole("button", { name: "Proposal" }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const name of ["Commitment", "Milestone", "Evidence", "Proposal"]) {
    await stages.getByRole("button", { name }).click();
    await expect(page.locator("[data-stage]")).toHaveAttribute(
      "data-stage",
      name,
    );
    await expect(stages.getByRole("button", { name })).toBeFocused();
  }
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByTestId("demo-record")).toHaveCount(6);
  const filters = page.getByRole("group", { name: "Filter workstreams" });
  for (const name of ["Design", "Build", "Review"]) {
    await filters.getByRole("button", { name }).click();
    await expect(page.getByTestId("demo-record")).toHaveCount(2);
    await expect(page.getByRole("status")).toHaveText("2 records");
    await expect(filters.getByRole("button", { name })).toBeFocused();
  }
  await filters.getByRole("button", { name: "View all" }).click();
  await expect(page.getByTestId("demo-record")).toHaveCount(6);
  await page.getByText("Read the context", { exact: false }).first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  expect(errors).toEqual([]);
});

test("mobile menu dismissal and keyboard navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Explore", exact: true })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#explore")).toBeFocused();
});

for (const width of [320, 390, 768, 1024, 1440])
  test(`responsive reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    for (const button of await page
      .getByRole("group", { name: "Atlas stage" })
      .getByRole("button")
      .all()) {
      await expect(button).toBeVisible();
      const bounds = await button.boundingBox();
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
    }
    await page.screenshot({
      path: `artifacts/${test.info().project.name}-${width}.png`,
      fullPage: true,
    });
  });

test("short landscape and enlarged text reflow", async ({ page }) => {
  await page.setViewportSize({ width: 740, height: 360 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => {
    document
      .querySelectorAll<HTMLElement>("h1,h2,h3,p,button,a,summary")
      .forEach((element) => {
        element.style.fontSize = `${parseFloat(getComputedStyle(element).fontSize) * 2}px`;
      });
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator("#the-record").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: /Keep the why/ }),
  ).toBeVisible();
});

test("no-JavaScript reading and native disclosures", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("atlas-fallback")).toBeVisible();
  await expect(page.getByTestId("demo-record")).toHaveCount(6);
  await expect(
    page
      .getByRole("group", { name: "Atlas stage" })
      .getByRole("button")
      .first(),
  ).toBeDisabled();
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await context.close();
});

test("scene selection, pause, offscreen lifecycle and context-loss fallback", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "WebGL frame instrumentation uses Chromium software rendering.",
  );
  await page.addInitScript(() => {
    const counts = { draws: 0 };
    Object.assign(window, { __drawCounts: counts });
    for (const Constructor of [WebGLRenderingContext, WebGL2RenderingContext]) {
      for (const method of ["drawArrays", "drawElements"] as const) {
        const original = Constructor.prototype[method];
        Object.defineProperty(Constructor.prototype, method, {
          value: function (...args: unknown[]) {
            counts.draws++;
            return Reflect.apply(original, this, args);
          },
        });
      }
    }
  });
  await page.goto("/");
  await expect(page.locator("[data-enhancement]")).toHaveAttribute(
    "data-enhancement",
    "ready",
  );
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Evidence" })
    .click();
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Evidence",
  );
  const count = () => page.evaluate(() => window.__drawCounts.draws);
  await page.getByRole("button", { name: "Pause motion" }).click();
  await page.waitForTimeout(200);
  const paused = await count();
  await page.waitForTimeout(300);
  expect(await count()).toBe(paused);
  await page.getByRole("button", { name: "Resume motion" }).click();
  await expect.poll(count).toBeGreaterThan(paused);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForTimeout(200);
  const hidden = await count();
  await page.waitForTimeout(300);
  expect(await count()).toBe(hidden);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: false,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(count).toBeGreaterThan(hidden);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const offscreen = await count();
  await page.waitForTimeout(300);
  expect(await count()).toBe(offscreen);
  await page.locator("[data-stage]").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const canvas = document.querySelector("canvas")!;
    canvas
      .getContext("webgl2")!
      .getExtension("WEBGL_lose_context")!
      .loseContext();
  });
  await expect(page.locator("[data-enhancement]")).toHaveAttribute(
    "data-enhancement",
    "failed",
  );
  await expect(page.getByTestId("atlas-fallback")).toBeVisible();
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Commitment" })
    .click();
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Commitment",
  );
});

test("changing reduced-motion preference removes enhancement", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "Scene checked in Chromium.");
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Milestone" })
    .click();
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Milestone",
  );
});

test("a failed deferred chunk preserves all demo controls", async ({
  page,
}) => {
  await page.goto("/");
  await page.route("**/_next/static/chunks/*.js", (route) => route.abort());
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Evidence" })
    .click();
  await expect(page.locator("[data-enhancement]")).toHaveAttribute(
    "data-enhancement",
    "failed",
  );
  await expect(page.getByTestId("atlas-fallback")).toBeVisible();
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Evidence",
  );
  await page
    .getByRole("group", { name: "Filter workstreams" })
    .getByRole("button", { name: "Build" })
    .click();
  await expect(page.getByTestId("demo-record")).toHaveCount(2);
});

test("slow scene loading preserves the latest selected stage", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "Scene checked in Chromium.");
  await page.goto("/");
  await page.route("**/_next/static/chunks/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await route.continue();
  });
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Evidence" })
    .click();
  await expect(page.locator("[data-enhancement]")).toHaveAttribute(
    "data-enhancement",
    "ready",
  );
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Evidence",
  );
  await expect(
    page.getByRole("heading", { name: "Let the work leave a record." }),
  ).toBeVisible();
});

test("saved-data preference keeps the lightweight atlas", async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    }),
  );
  await page.goto("/");
  await page.waitForTimeout(900);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByTestId("atlas-fallback")).toBeVisible();
});

test("unavailable WebGL preserves the complete page", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "WebGL failure interception uses Chromium.",
  );
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (type: string, ...args: unknown[]) {
        if (type.includes("webgl")) return null;
        return Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  await page.goto("/");
  await page.waitForTimeout(1200);
  await expect(page.getByTestId("atlas-fallback")).toBeVisible();
  await page
    .getByRole("group", { name: "Atlas stage" })
    .getByRole("button", { name: "Evidence" })
    .click();
  await expect(page.locator("[data-stage]")).toHaveAttribute(
    "data-stage",
    "Evidence",
  );
  await expect(page.getByTestId("demo-record")).toHaveCount(6);
});
