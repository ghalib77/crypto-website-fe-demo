---
name: nextjs-interactive-build
description: "Implement approved interactive website behavior in Next.js and TypeScript. Use when building routes, components, demo state, or browser-library boundaries in a Next.js project. Do not use for design-only requests, unrelated framework migrations, or dedicated 3D and animation tuning."
---

# Next.js Interactive Build

## Goal
Implement the requested experience while preserving server-rendered content, state consistency, and a minimal compatible dependency set.

## Workflow
1. Inspect repository instructions, accepted requirements/design/plan, package configuration, lockfile, and relevant code. Confirm implementation scope. Preserve existing user changes.
2. For a new scaffold, verify the latest stable Next.js and React compatibility through official documentation. For existing work, use pinned versions and actual package scripts; avoid incidental upgrades.
3. Build static route composition and semantic content first. Introduce client boundaries only for interactive state, handlers, effects, browser APIs, and client rendering libraries.
4. Model interactions with typed states and data contracts. Keep shared selection ownership explicit so HTML text, controls, and visual enhancements cannot diverge. Use local state unless actual cross-feature needs justify more.
5. Integrate browser-only libraries using patterns supported by the installed framework. Avoid browser globals during server rendering and unstable markup that causes hydration mismatches.
6. Provide reserved loading space and an enhancement failure boundary. Keep navigation, copy, and essential interactions usable before or without the heavy library.
7. Reuse the styling system and tokens. Extract components for distinct responsibility or actual reuse, not speculative configurability.
8. Run relevant discovered checks and the production build for substantial work. Inspect the rendered route and affected behaviors; fix regressions before reporting completion.

## Decision boundaries
- Do not disable strict typing, lint checks, or meaningful tests to hide defects.
- Add backend integrations only when required; clearly label demo data and simulated actions.
- Keep secrets server-side and avoid unsafe injection of untrusted content.
- Route specialist motion, scene, responsive, and QA tasks to their relevant workflow when available; do not require every skill for every change.

## Output
Deliver the scoped source changes and report verified behavior, commands actually run, important dependency decisions, and remaining limitations. Do not claim visual correctness from compilation alone.

## Completion
Finish when requested behavior works, core content is independent of enhancement loading, relevant checks pass, and rendered interaction was inspected or explicitly identified as unverified.
