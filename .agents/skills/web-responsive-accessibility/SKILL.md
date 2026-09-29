---
name: web-responsive-accessibility
description: "Implement or audit responsive and accessible web interactions. Use for layout reflow, touch and keyboard behavior, focus, semantic controls, zoom, reduced motion, and alternatives to canvas or dragging. Do not use to claim full accessibility certification or as a substitute for product design."
---

# Web Responsive Accessibility

## Goal
Preserve essential information and interaction across input methods, viewport sizes, and accessibility preferences.

## Workflow
1. Read accepted interaction/design requirements and inspect the affected rendered interface. Identify essential actions, reading order, focus order, advanced visuals, and current layout failures.
2. Select wide, intermediate, and narrow test widths based on content pressure. Include a 320 px reflow check, mobile landscape, 200% zoom, and longer text when relevant. Record actual viewport dimensions and emulation limitations.
3. Recompose columns and navigation as space changes. Preserve essential labels and actions; simplify decorative layers. Avoid fixed text heights, clipped controls, and page-wide horizontal overflow.
4. Use semantic links, buttons, headings, landmarks, and native form controls. Match any custom pattern to its keyboard semantics and expose state without redundant or misleading ARIA.
5. Exercise the complete essential path with keyboard. Verify visible unobscured focus, order, dismissal, and return focus where applicable. Trap focus only for a genuinely modal interaction.
6. Test touch equivalents and non-drag alternatives. Keep essential canvas meaning and controls available in HTML. Use text/shape/state indicators in addition to color.
7. Check real text and control contrast, target size, text resizing, reduced-motion behavior, pause, and restrained announcements. Apply the project's standard; for a public product without one, target WCAG 2.2 AA using current authoritative guidance.
8. Combine automated checks with manual inspection. Fix scoped defects and repeat the affected path; separate uncovered areas from passing checks.

## Evidence boundaries
- Never label a desktop crop as a mobile inspection or an automated scan as proof of full conformance.
- If browser resizing, touch emulation, or assistive technology is unavailable, report the unverified cases specifically.
- Record a discovered issue with condition, reproduction, impact, correction, and retest result.

## Output
Deliver requested fixes and a concise coverage/defect report. Include test conditions, manual and automated evidence, remaining limitations, and any product decision needed.

## Completion
Finish when the scoped essential path works in tested conditions, identified regressions are corrected, and coverage gaps are explicit. Do not certify an entire site from sampled tests.
