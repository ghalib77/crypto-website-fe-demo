---
name: web-asset-performance
description: "Prepare website assets and diagnose measured loading or rendering bottlenecks. Use for fonts, images, models, textures, bundle growth, layout stability, and performance budgets. Do not use for unrequested package upgrades, copying reference assets, or reporting unmeasured performance scores."
---

# Web Asset and Performance

## Goal
Reduce measured delivery and rendering cost while preserving approved visual meaning and asset provenance.

## Workflow
1. Inventory affected assets and dependencies: purpose, source/license, dimensions, format, transfer size, criticality, and reuse. Identify missing provenance before adding external assets.
2. Establish a baseline using available tools. Record build mode, route, viewport, device/emulation, network/CPU assumptions, cache state, and measurement method. Distinguish laboratory metrics from field data.
3. Trace the bottleneck before changing code: initial payload, font loading, image dimensions, heavy client bundles, blocked rendering, layout shift, animation work, or scene complexity.
4. Prioritize useful content and input responsiveness. Reserve asset dimensions, deliver suitable image sizes, subset fonts when licensing and tooling permit, and defer noncritical visuals without hiding essential content.
5. Compress or simplify models/textures and remove unused dependencies when evidence supports it. Check visual quality at actual display sizes. Preserve editable source assets and regenerate derivatives through their tools.
6. Evaluate changes one coherent group at a time. Repeat comparable measurements and inspect screenshots/interactions for quality regressions. Report variation rather than cherry-picking one run.
7. Propose or refine budgets tied to agreed devices and content. Explain the tradeoff before removing an approved feature; prefer reducing optional effects to losing essential behavior.

## Boundaries
- Use current primary documentation for volatile tooling and metric definitions. Do not hardcode a latest library version in the skill.
- Do not invent LCP, CLS, INP, frame-rate, memory, or bundle figures. Passing a build is not a performance measurement.
- Treat desktop throttling as an approximation; label physical-device coverage accurately.
- Respect asset licenses and source-inspection constraints. Avoid autoplay-heavy media unless the approved experience requires it.

## Output
Deliver optimized assets/source changes, provenance records in appropriate project documentation, and a before/after table with method, conditions, results, and visible tradeoffs. Record unmeasured concerns separately.

## Completion
Finish when targeted improvements are supported by comparable evidence, visual meaning and interactions survive, provenance is recorded, and remaining constraints are explicit.
