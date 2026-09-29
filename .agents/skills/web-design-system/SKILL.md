---
name: web-design-system
description: "Create or refine DESIGN.md for an interactive product website. Use when establishing original visual direction, typography, spacing, palette, component language, motion, 3D intent, or responsive transformations. Do not use as an implementation plan, token generator, or source-code workflow."
---

# Web Design System

## Goal
Create a coherent human-readable design contract that another agent can implement and extend.

## Workflow
1. Determine whether this is a new proposal, documentation of an existing interface, or an authorized redesign. Read the product brief and permitted reference evidence; preserve established decisions when documenting existing work.
2. Define one visual concept serving the product. Translate mood into observable typography, composition, surfaces, imagery, and interaction. Explain meaningful anti-goals without combining every reference motif.
3. Specify the page hierarchy and spatial system: content width, alignments, readable measure, section rhythm, and dense versus spacious regions.
4. Define typography by role, responsive scale, weight, line height, fallback, and longer-text behavior. Define spacing by relationship and a constrained scale.
5. Define semantic color roles, approved pairings, boundaries, focus, and selection. Keep exact reusable values in existing tokens when available; label new values as proposed tokens.
6. Define component anatomy, variants, affordances, and interactive states. Preserve compositional variation instead of making every section the same card grid.
7. Define motion purpose, trigger, timing character, interruption, pause, and reduced motion. For relevant 3D, define scene meaning, materials, camera, interaction, loading, and fallback without prescribing application architecture.
8. Specify narrow/intermediate/wide transformations, text resizing, accessibility, performance constraints, and visual verification conditions.
9. Review all decisions together for product fit, originality, internal consistency, and practical implementation clarity.

## Boundaries
- Do not copy reference assets, marks, copy, or exact compositions.
- Separate observed evidence from proposed choices. Do not claim mobile inspection, contrast validation, font identification, or performance measurement without evidence.
- Respect existing user approval gates. If approval is requested, deliver the concrete proposal and stop before implementation.

## Output
Produce a complete DESIGN.md with status, premise, visual concept, structure, typography, spacing, colors, surfaces/components, interactions/motion, relevant 3D, responsive behavior, accessibility, performance, verification, and material assumptions.

## Completion
Ensure the document is coherent, accessible by design, explicit about enhancement fallbacks, and free of implementation-plan detail. State which decisions need approval only when the user's workflow requires it.
