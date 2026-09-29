---
name: web-3d-scene
description: "Implement, optimize, or debug an interactive WebGL scene for a website. Use for geometry, materials, lighting, camera, scene state, resource lifecycle, and fallback behavior. Do not use for ordinary DOM animation, exact data charts, or 3D effects adequately served by CSS or SVG."
---

# Web 3D Scene Engineering

## Goal
Build a purposeful bounded scene that enhances product understanding without becoming a dependency for essential content.

## Workflow
1. Read the approved 3D concept and performance constraints. Identify the scene's communication job, required states, camera limits, HTML controls, and static representation.
2. Inspect installed renderer/library versions and compatibility through official documentation. Prefer existing capabilities; choose Three.js/React Three Fiber only when actual WebGL meets the requirement better than lighter techniques.
3. Establish a minimal scene and static fallback first. Reserve dimensions, isolate browser rendering, and define initialization failure, unsupported WebGL, context loss, and unmount behavior.
4. Build geometry, lighting, and materials from the product metaphor. Prefer procedural or licensed resources; document provenance for external models and textures. Avoid copying reference geometry or distinctive visual assets.
5. Keep UI state owned outside renderer internals where it is shared. Translate state to scene targets; update continuous movement through renderer-native mechanisms rather than React state each frame.
6. Bound camera/pointer behavior and keep essential labels in HTML. Ensure keyboard and touch selection works without drag or free orbit; do not hide information behind perspective.
7. Cap rendering resolution, geometry, textures, and optional effects using measured results. Pause offscreen/hidden rendering and ambient motion. Use demand rendering when idle, invalidating when visible state changes.
8. Handle reduced motion and low-resource modes with a stable scene or equivalent SVG/image. Reuse resources and dispose manually owned resources without disposing shared assets still in use.
9. Test loading, selection, reset, resizing, pause, reduced motion, context loss/failure where tools support it, and repeated mount/unmount. Measure on documented representative environments and report actual coverage.

## Output
Deliver the scene, equivalent fallback, resource provenance, measured budgets/limitations, and verification results. Do not claim mobile-device performance from desktop emulation alone.

## Completion
Finish when HTML and scene states agree, core content survives enhancement failure, lifecycle work stops appropriately, resources remain bounded, and visual behavior is inspected or specifically marked unverified.
