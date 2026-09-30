# Implementation plan — Hearthline / Progress Atlas

Status: implemented following the user’s “Implement it” instruction on 30 September 2026. The original plan below is retained as the implementation baseline; see VERIFICATION.md for actual results and remaining limitations.

## Basis and scope

Read the current `AGENTS.md` and `DESIGN.md` from `ghalib77/crypto-website-fe-demo/main` on 30 September 2026. The repository root contains these documents, README, and agent skills; there is no application scaffold, package manifest, lockfile, test configuration, or CI to reuse. Commands and byte budgets therefore cannot be reported as discovered or measured.

Plan the fictional Hearthline single-page experience described in DESIGN.md: navigation, hero Progress Atlas, How it works, Open Access Toolkit exploration, records, closing, and footer. Keep DEMO DATA labels visible. Native in-page actions lead to real section targets. No backend, authentication, wallet, transaction, or submission service is required.

DESIGN.md remains a proposal awaiting approval. This plan develops that proposal without changing its status. Outstanding mobile reference inspection remains unverified; the responsive behavior below comes from the authored design requirements.

## 1. Dependencies and setup decisions

At authorized setup, verify the latest stable Next.js release, supported Node runtime, and React compatibility in official documentation; pin the resolved versions. Use TypeScript and App Router. With no existing package-manager evidence, propose npm and one committed lockfile.

Use CSS Modules for component styles and a small global token/reset stylesheet. Encode the palette, typography, spacing, radii, and duration ranges from DESIGN.md. Use CSS transitions and browser observers for DOM behavior; the specified motion does not justify Motion or GSAP initially.

The proposed WebGL enhancement adds only `three` and `@react-three/fiber` as runtime packages beyond Next.js/React. Verify peer dependencies and stable-release compatibility before installation. Add matching development types if required. Avoid Drei, postprocessing, physics, icon kits, UI kits, and state packages. Use local React state and native HTML disclosures.

For verification, propose one browser test runner, Playwright, as a development dependency; use its assertions for key behavior and failure cases. Reuse it for browser traces and screenshots. Add further test tooling only if a specific gap justifies it. Establish actual scripts at scaffold time for development, lint, type checking, browser tests, and production build; this document does not claim those scripts exist.

## 2. Server/client boundaries and component structure

Keep `app/layout.tsx` and `app/page.tsx` as Server Components. The layout owns metadata, font configuration, global styles, and landmarks. The page composes static sections and passes serializable, typed demo data into interactive islands. Client Components may still provide initial server-rendered HTML; only the WebGL renderer skips SSR.

| Component or module | Boundary | Responsibility |
| --- | --- | --- |
| SiteHeader | Server shell | Wordmark, anchors, primary demo action; composes navigation enhancement. |
| NavigationControls | Client | Nonmodal mobile disclosure and active-section indicator; Escape/selection closes menu, focus returns to trigger when appropriate. |
| HeroSection | Server shell | H1, benefit copy, concept label, native CTA anchors, atlas description. |
| AtlasExperience | Client island | Stage selection, explanation, pause state, enhancement eligibility; composes controls, SVG, and scene loader. |
| StageControls / MotionControl | Client children | Native buttons with exposed selected/paused state and 44 px targets; no canvas-only controls. |
| AtlasDiagram | SSR-compatible presentation | Original SVG depicting the four stages; shares stage IDs and coordinates with the scene. |
| SceneLoader / SceneErrorBoundary | Client | Conditional dynamic import, loading state, initialization and context-loss fallback confined to atlas. |
| AtlasScene | Browser-only client module | One canvas, camera, procedural contours, nodes, path, lighting, frame scheduling, resource lifecycle. |
| HowItWorksSection | Server | Three numbered steps with readable copy and fine dividers. |
| ExploreSection | Server shell | Project introduction, DEMO DATA label, heading; passes local dataset to ExploreDemo. |
| ExploreDemo | Client island | Workstream selection, derived result list, milestone/status summary, restrained live announcement. |
| WorkstreamControls / MilestonePath / DemoRecordList | Client children | Present the selected subset without owning duplicate filter state. |
| RecordSection / RecordCard | Server | Decision, Commitment, Evidence summaries and context; native `details`/`summary` for inline disclosure. |
| ClosingSection / SiteFooter | Server | Repeated demo anchor, fictional-product disclosure, in-page links. |
| demo-data / atlas-model / tokens | Shared data/styles | Typed fictional records, deterministic stage geometry, approved design values; no browser APIs. |

Place page-specific components under `components/hearthline/`, scene code under its `atlas/` feature, and dataset/types under `lib/hearthline/`. Extract shared primitives only when real reuse appears. Never import the scene renderer from the page, shared dataset, or SVG module.

State contract: `stage` is Proposal, Commitment, Milestone, or Evidence; default Proposal. `workstream` is all, Design, Build, or Review; default all. AtlasExperience owns stage and user pause; ExploreDemo owns filter. Disclosures keep native independent state. Scroll changes the navigation indicator only, never stage or workstream. No persistence or URL synchronization is needed.

Use grouped native buttons with `aria-pressed` for selectors, rather than tab semantics without tab panels. Selection updates HTML immediately, preserves trigger focus, and then updates the visual. The optional How it works stage shortcuts are omitted initially: they add cross-section state coupling without being required by DESIGN.md.

Proposed interpretation: workstream filters affect Explore's records and status summary; The record remains a stable three-record explanation. View all restores the complete Explore dataset. Keep project milestones fixed and highlight relevant milestones without inventing progress totals. Confirm this interpretation if a different cross-section filter effect is intended.

## 3. Animation ownership

| Owner | Animated properties | Behavior |
| --- | --- | --- |
| Control CSS | Color, border, modest opacity | Feedback in 120–180 ms; focus ring remains immediate and visible. |
| Atlas HTML/SVG presentation | Path emphasis and optional explanatory fade | 220–360 ms; no delayed state commit, fixed-height text clipping, or focus movement. |
| AtlasScene frame loop | Node/material emphasis, contour offsets, camera response | Scene-only transforms; never DOM layout or React state per frame. |
| Record disclosure | Native open/closed layout | No height-animation package; summary and keyboard focus remain stable. |
| Section presentation | Optional small opacity/translation | At most 12 px, 400–600 ms; omit initially unless visual review demonstrates a benefit. Content visible before enhancement. |

One owner per property. CSS owns DOM motion; scene code owns WebGL motion. Do not animate the same visual via CSS wrapper transforms and scene camera simultaneously. Rapid selections interrupt from current visual state and converge to the latest selected stage.

Read reduced-motion preference before enabling enhancement; initially render the SVG. Reduced motion selects the stable SVG, removes parallax, ambient drift, and smooth anchor scrolling. Pause stops autonomous frame requests, including pointer parallax, while selection remains functional. Explicit stage changes may request bounded settling frames; idle, paused, offscreen, and hidden states stop continuous work. Clean up observers, media listeners, event listeners, timers, and frame requests on unmount.

## 4. 3D scene responsibilities

Build three shallow original contour planes, four simple nodes, and one connecting path. Use deterministic geometry, matte mineral surfaces, a fixed oblique camera, one soft key light plus minimal ambient fill. No model files, textures, shadows, bloom, particle logo, orbit controls, or lower-page canvases.

Share stage IDs and normalized node coordinates with the SVG; derive selected-node and path styling from the same stage prop. The canvas is decorative and hidden from assistive technology; a nearby HTML description explains the atlas. HTML controls are the authoritative interaction surface. Initial scope does not need mesh picking or raycasting.

Permit only a few degrees of pointer response on fine-pointer devices. Reset camera smoothly on pointer exit. Narrow mode reduces contour count/depth and reframes nodes so they remain separated; touch does not enable pointer parallax.

Use demand rendering when idle and explicit frame requests while visible ambience or settling is active. Suspend continuous scheduling on visibility loss or offscreen observation, freeze elapsed phase rather than jumping on resume, and invalidate for meaningful state changes. Dispose manually created geometry/materials and avoid duplicating resources during remounts.

Provisional engineering ceilings, to validate after scaffold: one canvas; DPR at most 1.5 wide and 1 narrow; at most 30 draw calls and 20,000 triangles; zero texture/model transfer. These are starting limits, not measured results. If mobile input or rendering suffers, reduce geometry and DPR, then default to SVG. Do not increase budgets simply to preserve ambience.

## 5. Assets and provenance

| Asset | Preparation | Loading |
| --- | --- | --- |
| Manrope | Obtain licensed WOFF2 Latin subset; variable font or minimal weights covering 400–600; retain license/source. | Self-host through Next font facilities; swap/system fallback; preload only what measurement justifies. |
| IBM Plex Mono | Licensed WOFF2 Latin subset, minimal metadata weight; retain license/source. | Self-host; avoid competing preload priority with body font. |
| Atlas SVG | Agent-authored, responsive viewBox; four stage coordinates shared with scene; selected-state styling. | Inline and present in initial HTML. |
| Scene geometry | Agent-authored deterministic contours, nodes, path. | Generated only after scene eligibility; no network model fetch. |
| Wordmark and small icons | Text wordmark and minimal original inline SVG arrow/menu symbols. | Inline; accessible labels on controls. |
| Demo content | Typed Open Access Toolkit records, milestones, stage explanations, mock context. | Local serializable data; all content explicitly fictional. |

Reserve font fallbacks and scene dimensions to reduce shifts. No reference asset downloads or external photography. A favicon or social-preview asset can be prepared from the original identity for handoff; publication metadata is provisional until a deployment URL exists.

## 6. Loading and failure strategy

1. Server-render all narrative sections, anchors, initial demo records, default explanation, disclosures, and SVG. Avoid page-wide Suspense/loading gates.
2. Hydrate navigation and demo controls independently of the scene. With JavaScript disabled, core content, anchors, and native record disclosures remain readable; filter/stage controls should not falsely appear functional before hydration.
3. In a small client loader, check motion preference and enhancement eligibility. Use saved-data preference where available as a reason to keep SVG; do not depend on unreliable device-memory heuristics. Initially keep reduced-motion and explicitly constrained users on SVG.
4. Request the scene chunk after hydration and initial usable content, when the hero is visible, scheduling work opportunistically without delaying an explicit control action. Browser idle scheduling needs a supported fallback. Do not import the chunk for users who remain on SVG.
5. Declare browser-only dynamic loading in the Client Component, using the installed Next.js-supported pattern. Keep the SVG underneath until the renderer successfully produces its first frame. Crossfade only when motion is permitted; reserve the same container throughout.
6. Chunk failure, unsupported WebGL, initialization failure, or context loss returns to the current-stage SVG. Keep HTML controls and explanation unchanged. Avoid automatic repeated retries; a scene failure never replaces the page.

No scene skeleton, spinner, or font request may block headline/CTA interaction. Loading the scene is not a reason to reset user selection.

Byte-budget checkpoint: after the production static scaffold, measure compressed transferred HTML, CSS, initial JavaScript, fonts, and then the isolated scene chunk. Record actual bytes and set concrete ceilings before polishing 3D. The repository has no baseline from which to make credible transfer claims today. Verify separately that Three/Fiber are absent from the initial core bundle.

## 7. Responsive implementation

Use content-driven CSS grid/flex and fluid type. Start with DESIGN.md's approximate thresholds, adjusting where content fails:

| Width/context | Transformation and check |
| --- | --- |
| ≥1200 px | Five/seven split hero; three process columns; Explore controls beside results; three record columns where copy fits. Max content width near 1360 px. |
| 768–1199 px | Stack hero before headline cramping; Explore controls above results; two record columns where suitable; reduce gaps without shrinking essential labels. |
| <768 px | Promise/actions first; atlas below with 280–340 px visual reservation, controls outside that fixed visual area; menu disclosure; stacked steps and records; wrapping selectors. |
| 320 px | 16 px minimum gutters when necessary; no page overflow; long labels wrap; every control/explanation preserved. |
| Landscape / 200% zoom | Natural section height, no mandatory full-screen panels, reflowing navigation, adequate anchor scroll margin and visible focus. |

Use 44 px minimum control targets, 50–70 character reading measures, and the specified spacing rhythm. Allow description/disclosure height to grow. Reduced-motion and touch behavior are capability rules, not merely viewport breakpoints. Test mobile viewport behavior directly rather than inferring it from cropped desktop images.

## 8. Delivery sequence and evidence

| Step | Work after implementation authorization | Evidence required before proceeding |
| --- | --- | --- |
| 1 | Resolve approved product/design status; create minimal pinned scaffold and actual validation scripts. | Version/peer compatibility recorded; one lockfile; scaffold builds and type checks. |
| 2 | Implement tokens, fonts, all static sections, anchors, fictional dataset, SVG, native disclosures. | Complete readable page without scene; content/design comparison at wide and narrow widths. |
| 3 | Add menu, active-section observer, stage selector, workstream filter/reset and announcements. | Keyboard/touch-equivalent flows pass; default/reset states consistent; no console or hydration errors. |
| 4 | Add bounded CSS feedback and motion preference handling. | Content never hidden awaiting animation; rapid selection, reduced motion, and focus remain correct. |
| 5 | Measure static baseline, establish transfer ceilings, then implement isolated scene and fallbacks. | Core bundle excludes scene; first-frame swap stable; pause/offscreen/hidden/context-loss behavior verified. |
| 6 | Refine responsive layouts, contrast, long content, zoom and representative mobile scene quality. | Screenshots and interaction evidence for each matrix case; no overflow or obscured focus. |
| 7 | Run production checks and write handoff with actual results and limitations. | Lint/type/browser checks and production build pass; measured performance and unverified items stated honestly. |

No deployment is part of this plan. All coding, assets, debugging, and verification remain agent-performed; the user directs and reviews.

## 9. Verification matrix

| ID | Requirement | Verification evidence |
| --- | --- | --- |
| V1 | Narrative, anchors, concept labels and footer | Inspect initial HTML and JavaScript-disabled browser; all target sections exist, no invented integration claims. |
| V2 | Stage default and consistency | Proposal initially; all four selections update explanation, SVG, and scene consistently; latest rapid input wins; focus stays on trigger. |
| V3 | Workstream filtering/reset | Design/Build/Review show expected typed records; View all restores complete set; count/status and restrained announcement match results. Test empty subset behavior if dataset permits it. |
| V4 | Navigation/disclosures | Keyboard and touch menu open/close; Escape; anchor selection; focus handling; sticky-header clearance; each native disclosure opens independently. |
| V5 | Motion lifecycle | Pause/resume, preference set before load and changed during use, hidden tab, offscreen scroll, remount; record frame activity stopping rather than merely a frozen image. |
| V6 | Enhancement failure | Block scene chunk; disable WebGL; simulate initialization/context loss; slow loading; verify current-stage fallback, active controls, no page-wide error or visual jump. |
| V7 | Responsive/accessible reading | 320, 390, 768, 1024, 1440 px; short landscape; 200% zoom; longer copy. Screenshots, keyboard pass, target sizes, contrast calculations, and screen-reader sampling. |
| V8 | Production correctness | Actual configured lint/type checks, browser behavior suite, production build and production-serving smoke test; no failed required assets or hydration errors. |
| V9 | Performance | Production transfer breakdown and loading trace; lab LCP/CLS toward ≤2.5 s/≤0.1 under recorded conditions; input timings/long tasks during filtering and scene use; representative mobile rendering check. INP ≤200 ms remains a field target, not inferred from a Lighthouse score. |

Use Chromium for the full interaction/failure suite and check critical flows in WebKit/Firefox where available. Record emulated vs real-device results, network/CPU settings, viewport, browser, and build mode. If no real mobile device is available, disclose that explicitly. Automated checks support, but do not establish, full WCAG compliance.

## 10. Uncertain and high-risk areas

| Area | Likelihood / impact | Resolution and smallest useful check |
| --- | --- | --- |
| Product and design approval | Known unresolved / high scope impact | Hearthline is fictional and DESIGN.md is proposed. Obtain explicit implementation direction before building; no plan silently approves the concept. |
| Next/React/Fiber compatibility | Medium / high | Resolve stable package peer ranges at setup and compile a minimal isolated canvas before scene work; avoid prerelease renderer APIs. |
| Mobile WebGL, battery and context loss | Medium / high | Small scene prototype on representative mobile hardware; measure responsiveness, frame scheduling and fallback; keep SVG available and downgrade quality. |
| Lazy import, hydration and fallback synchronization | Medium / high | Production-build test with blocked/slow chunks and pre-load stage changes; verify scene initializes from current state and is absent from core bundle. |
| Meaning of workstream filtering | Medium / medium | Current proposal filters Explore only and retains explanatory records. Review dataset/result examples before coding; keep IDs and relationships explicit. |
| Complete fictional dataset | Known incomplete / medium | Author record IDs, workstream membership, statuses and source context first; inspect sample output for coherence and visible DEMO DATA labeling. |
| Reference mobile evidence | Known missing / medium | Complete reference viewport/touch inspection using supported controls if comparison fidelity is needed; do not treat the gap as proof the authored mobile design works. |
| Font license, transfer and layout shifts | Low–medium / medium | Verify actual font distributions/license, use minimal subsets and fallback metrics; compare blocked-font and loaded-font renders. |
| Performance byte ceilings | Known unmeasured / medium | Measure static scaffold before scene enhancement; set explicit initial/deferred transfer budgets and optimize from trace evidence. |
| Active navigation at zoom/short heights | Medium / medium | Test anchor jumps and observer thresholds at 200% zoom and landscape; active-section indication must never change explicit demo selection. |

## Technical references

Consulted official documentation for the proposed boundaries and scheduling, without inspecting library source:

- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading): browser-only `ssr: false` loading belongs in a Client Component.
- [React Three Fiber performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance): demand rendering requires invalidation for scene mutations.
- [React Three Fiber installation](https://r3f.docs.pmnd.rs/getting-started/installation): verify React/renderer compatibility again against the packages selected at setup.

This document specifies future work and expected evidence. No application, tests, dependency installation, or deployment was performed for this planning request.
