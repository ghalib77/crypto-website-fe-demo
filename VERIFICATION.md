# Verification — Hearthline

Verified 30 September 2026 against the local production build at `http://127.0.0.1:3000`, Node.js 24.19.0, Next.js 16.3.7, React 19.3.0, Three.js 0.186.1, Fiber 9.8.1. Source, test, and asset changes are included in the same implementation commit as this report.

## Results

- `npm run lint`: pass.
- `npm run typecheck`: pass with TypeScript 5.9.3.
- `npm run build`: pass; `/` is statically prerendered. The sandbox initially blocked the framework's TypeScript subprocess; the unrestricted build completed successfully without disabling checks.
- `npm test`: **37 passed, 8 intentionally skipped**, using Playwright 1.51.1, Chromium 134, Firefox 135, and WebKit 18.4. The eight skipped cases are four explicit WebGL scenarios repeated in Firefox/WebKit; those scenarios passed in Chromium with software rendering. The current Playwright browser archive failed to download, so the test tool is pinned to a distribution obtainable through its working alternate mirror.
- axe-core 4.13.0: zero detected WCAG-tagged violations at 1440 and 390 px; 25 rule groups passed per viewport. Color contrast required manual review. Token/state calculations range from 4.98:1 for meaningful control borders to 15.78:1 for primary text; the tested normal-text pairs all exceed 4.5:1. This is sampled verification, not full accessibility certification.

## Coverage

| Requirement | Evidence / result |
| --- | --- |
| Complete narrative and fictional labels | Visible sections, initial HTML, six records, and concept disclosure inspected. No-JavaScript tests pass in all engines. |
| Stage selection | Proposal default; all four selections update state and explanation, preserve focus, and work with reduced motion. |
| Workstream filters | Each subset returns two records; View all restores six; live result count and focus verified. |
| Navigation and disclosures | Skip link keyboard focus, mobile menu open/close, Escape focus return, anchor selection, and native record expansion pass. |
| Responsive layout | No page overflow at 320, 390, 768, 1024, 1440 px in all three engines. Desktop and mobile images inspected. Decorative perspective-grid overflow at 768 px was fixed. |
| Landscape and larger text | 740 × 360 viewport with all heading/paragraph/button/link/summary font sizes doubled passes overflow and reading checks. This is text enlargement, not a claim of native browser zoom verification. |
| Scene lifecycle | Chromium instrumentation verifies draw calls stop when paused, fully offscreen, and on a simulated hidden-document event. Resume restarts rendering. |
| Scene loading / failure | Slow scene download preserves latest selection; blocked deferred chunk retains controls; WebGL unavailability and actual `WEBGL_lose_context` restore/retain SVG. |
| Reduced motion / saved data | Initial reduced motion and saved-data hint skip canvas; changing reduced motion removes an existing canvas. |
| Browser errors | No unexpected page errors in the core interaction suite. Intentional failed-chunk/context-loss cases exercise the isolated error path. |

## Measured performance and budgets

Conditions: local production server, Chromium 134 on Linux, 390 × 844 CSS px, fresh contexts, 4× CPU throttling, 1.6 Mbps download, 750 Kbps upload, 150 ms latency, software WebGL. One sample with reduced motion and one with enhancement. These are lab samples, not field percentiles or real-device measurements.

| Measure | SVG / reduced motion | With scene |
| --- | --- | --- |
| LCP | 860 ms | 628 ms |
| CLS | 0.00133 | 0.00133 |
| Compressed JavaScript response bodies | 139,663 bytes | 382,232 bytes total |
| Compressed HTML response body | 25,034 bytes | 25,034 bytes |
| Compressed CSS response bodies | 5,043 bytes | 5,043 bytes |
| Font response bodies | 39,544 bytes | 39,544 bytes |
| Sampled interaction event durations | 32–48 ms | 32–56 ms |
| Maximum scene draw calls / triangles per sampled frame | 0 / 0 | 14 / 2,400 |

The enhancement adds **242,569 compressed JavaScript bytes** after the core page. The reduced-motion run does not request those scene resources. Resource lists and timings are retained in `docs/verification/performance.json`.

Baseline-derived regression budgets: initial JavaScript ≤175 KiB; deferred scene JavaScript ≤275 KiB; combined fonts ≤45 KiB; CSS ≤10 KiB; one canvas; ≤30 draw calls and ≤20,000 triangles. Current measurements fit those limits. DPR is capped at 1.5 desktop / 1 mobile; there are no texture/model downloads.

The scene-enabled sample also recorded startup long tasks up to **345 ms** under CPU throttling. Scene initialization remains a main-thread performance risk on weaker devices. Sampled event timings do not establish field INP; the design target of INP ≤200 ms requires broader production and physical-device evidence.

## Remaining limitations

- Physical Android/iOS hardware, battery behavior, native 200% browser zoom, and screen-reader operation were not directly tested.
- Firefox/WebKit core behavior and fallback pass; their live WebGL lifecycle is not claimed verified.
- The tests use older pinned browser builds available in this environment. Current shipping browser/device coverage should be completed before a production release.
- The original four reference sites still lack completed mobile-reference inspection; this does not represent verification of their mobile behavior.
- Metadata is prepared for the fictional concept; no public production URL, analytics, backend, or deployment is configured.

## Evidence

- `docs/screenshots/hero.png`, `desktop.png`, `mobile.png`: actual production screenshots, with motion paused for capture.
- `docs/verification/performance.json`: conditions, navigation/resource sizes, lab timings, long tasks, and renderer counts.
- `docs/verification/accessibility.json`: axe audit summary.
- `docs/verification/contrast.json`: semantic color/state calculations.
- `tests/experience.spec.ts`: reproducible behavioral and failure coverage.
