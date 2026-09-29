---
name: web-implementation-plan
description: "Translate accepted website requirements and design into an executable implementation plan. Use for a complete interactive experience, architectural changes, or features spanning state, motion, and 3D. Do not use to redesign an accepted interface or impose a planning phase on a small localized fix."
---

# Web Implementation Plan

## Goal
Produce a dependency-ordered plan with explicit ownership and verification, grounded in the actual project.

## Workflow
1. Inspect applicable instructions, requirements, design status, repository configuration, package scripts, and existing implementation. Establish whether implementation is authorized; a proposed design is not proof of approval.
2. Map each accepted behavior to a section/component responsibility. Distinguish route composition, reusable primitives, feature state, animation coordination, and scene rendering.
3. Specify Server and Client Component boundaries. Keep static content server-renderable and browser-dependent libraries within client islands. Record who owns state shared by controls, text, and visuals.
4. Assign animation properties to one owner and scene responsibilities to one rendering boundary. Describe cleanup, offscreen/hidden behavior, reduced motion, and error fallback.
5. Inventory assets with provenance, generation/optimization needs, dimensions, and loading priority. List existing dependencies first; justify new runtime packages through concrete needs and compatibility checks.
6. Plan delivery order: readable static page and controls, interaction state, motion enhancement, scene enhancement, responsive/accessibility correction, verification. Avoid creating a separate backend for a local concept demo.
7. Define loading and failure behavior, responsive transformations, and verification tied to requirement identifiers. Discover actual project commands instead of inventing script names.
8. Identify risk, likelihood/impact, mitigation, and the smallest experiment that resolves each uncertainty. Distinguish unresolved product decisions from technical uncertainty.
9. Keep the plan proportional and update it when evidence changes. Avoid introducing extra approval gates when implementation has already been authorized.

## Output
Create or update an implementation plan with boundaries, responsibility table, dependency-ordered steps, assets/dependencies, loading/fallbacks, responsive behavior, validation matrix, risks, and unresolved decisions. State expected evidence for each step.

## Completion
Finish when each requirement has an implementation owner and verification path, expensive enhancements cannot block core content, and uncertainties have actionable resolution steps. Stop before implementation when the user requested planning only.
