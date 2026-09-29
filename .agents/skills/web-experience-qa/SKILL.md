---
name: web-experience-qa
description: "Verify an implemented website against accepted requirements and design, and diagnose defects. Use after meaningful frontend changes, for final browser QA, or when reproducing interaction, responsive, visual, loading, and fallback failures. Do not use as the primary workflow for building from scratch or certifying full accessibility compliance."
---

# Web Experience QA

## Goal
Produce an evidence-backed assessment and correct authorized defects until the scoped experience meets its acceptance criteria.

## Workflow
1. Read relevant requirements, accepted design, change scope, and available checks. Identify the exact route/build under test and whether fixes are authorized or the request is audit-only.
2. Create a coverage matrix mapping requirement IDs to test conditions and outcomes. Distinguish automated, manual browser, real-device, emulated, and untested evidence.
3. Run discovered targeted checks; use broader checks when shared behavior or infrastructure changes. Preserve meaningful failures and separate pre-existing failures from regressions where evidence permits.
4. Inspect rendered wide, intermediate, and narrow layouts when tools allow. Check hierarchy, typography, spacing, overflow, anchor offsets, fixed navigation, loading stability, and actual interactive states.
5. Exercise navigation, selection, reset, disclosures, keyboard focus, menu dismissal, rapid inputs, pause/resume, reduced motion, and relevant touch alternatives. Inspect loading and enhancement failure paths without making consequential external submissions.
6. Check console errors, failed assets, hydration warnings, and visible runtime failures through permitted tools. Reproduce each issue with minimal steps; record expected versus actual behavior and impact.
7. If fixes are authorized, address root causes in scoped source and repeat affected checks. Do not hide failures with suppressed checks or claim a visual fix from source inspection alone. If audit-only, report defects without mutation.
8. Keep immutable evidence for meaningful observations when supported. Use screenshots to demonstrate visible states, but do not infer animation correctness from a still image.

## Evidence rules
- Mark cases pass, fail, blocked, or not tested. Never turn unavailable browser/viewport controls into a pass.
- Compilation is not visual verification; emulation is not a physical device; a sampled accessibility check is not certification.
- If a live reference differs from the accepted original design, evaluate the original design contract rather than demanding a clone.

## Output
Produce a concise verification report with tested build/route, coverage matrix, reproducible defects, correction/retest results, and limitations. State whether the work is ready for review based on available evidence.

## Completion
Finish when scoped checks are complete or concretely blocked, introduced defects are resolved when fixes are authorized, and unresolved risks and missing evidence are plainly reported.
