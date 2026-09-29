---
name: web-product-story
description: "Design the narrative, content, and interaction model for a single-page product website. Use when defining section order, calls to action, demo behavior, or interface states. Do not use as the primary workflow for visual tokens or frontend implementation."
---

# Web Product Story

## Goal
Make the product understandable through a coherent reading path and a meaningful interactive example.

## Workflow
1. Read the applicable brief and accepted design context. Establish the product promise, audience, primary action, and real versus fictional capabilities.
2. Write a section sequence that answers: what is it, why does it matter, how does it work, what can I explore, and what should I do next? Give each section one communication job.
3. Draft headlines, explanatory copy, action labels, and demo disclaimers. Use concrete verbs and avoid unsupported traction, partners, financial claims, or testimonials.
4. Define each interaction's initial state, trigger, state change, visible feedback, reset path, and keyboard/touch equivalent. Specify focus behavior and whether a meaningful change needs an announcement.
5. Keep hover previews separate from committed selection. Define how explicit selection interacts with scroll-driven behavior so scrolling cannot unexpectedly overwrite user intent.
6. Create internally consistent sample records when mock content is authorized. Distinguish simulated success from actual persistence or submission.
7. Define relevant loading, empty, error, disabled, and enhancement-failure states. Ensure the reading path and primary action still work without the visual enhancement.
8. Review the page for duplicated explanations, competing calls to action, misleading affordances, and inaccessible hidden information.

## Output
Produce section purpose/copy, an interaction-state table, sample data requirements, and unresolved content decisions. Place these in the appropriate project document; do not create competing versions of existing accepted content.

Use a state table with: control, initial state, input, resulting state, feedback/focus, reset, and fallback. Omit states that genuinely do not apply rather than inventing backend requirements.

## Completion
Finish when the visitor can understand the promise without animation, every essential action has defined behavior and alternatives, and all mock content is visibly identified. Do not implement UI during a content-only request.
