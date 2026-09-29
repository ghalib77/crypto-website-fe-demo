---
name: web-motion
description: "Implement or debug DOM and SVG animation for interactive websites. Use for transitions, gestures, scroll-linked effects, animation interruption, lifecycle cleanup, pause, or reduced motion. Do not use as the primary workflow for WebGL scene rendering or adding decorative motion without a design requirement."
---

# Web Motion Engineering

## Goal
Implement motion that communicates state and continuity while preserving control, readability, and lifecycle correctness.

## Workflow
1. Read the accepted motion and interaction requirements. Inventory each trigger, animated property, transition, final state, and interruption case in the affected region.
2. Assign one owner to each property. Prefer CSS for local effects; use the existing primary motion library for coordination, gestures, or layout transitions. Add another engine only for a distinct requirement.
3. Keep readable content available at first paint. Define the static state before defining the animation; motion loading or failure must not leave content hidden.
4. Implement immediate control feedback, coordinated state changes, and deterministic final values. Handle rapid repeated input, reversals, route changes, and interruption without stacked timelines.
5. Use native scrolling. If scroll changes decorative state, preserve explicit user selection and do not lock page progression. Avoid repeated layout measurement or per-frame React state updates.
6. Implement reduced motion from first load and preference changes. Stop nonessential ambient work when paused, offscreen, or hidden; resume without duplicating loops. Keep selection and content disclosure functional.
7. Clean up observers, listeners, animations, and subscriptions. Inspect repeated mounts and unmounts for duplicate work or lingering callbacks.
8. Test normal, interrupted, paused, reduced-motion, hidden/offscreen, and remounted behavior in the browser. Profile relevant responsiveness under documented conditions when continuous motion is involved.

## Output
Deliver scoped animation changes plus a brief ownership/behavior summary and verified test conditions. Distinguish timings proposed in the design from timings actually implemented.

## Completion
Finish when final states remain correct under interruption, core content never depends on reveal completion, pause stops work, reduced motion preserves meaning, cleanup works, and the animation is visually inspected or reported unverified.
