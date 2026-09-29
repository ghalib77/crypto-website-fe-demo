---
name: web-requirements
description: "Turn website briefs into scoped, verifiable requirements. Use when defining a new interactive website, resolving ambiguous product scope, or changing acceptance criteria. Do not use for a localized implementation fix with established requirements."
---

# Web Requirements

## Goal
Produce an actionable brief that separates confirmed requirements, assumptions, and unresolved decisions.

## Workflow
1. Recover the product, audience, reference URLs, requested outcome, and constraints from available context. Follow applicable repository instructions; do not ask for information already supplied.
2. Identify the primary visitor action and what the visitor must understand first. Distinguish a concept demo from a functioning product, including whether data, submissions, accounts, or transactions are real.
3. Define included sections and interactions, content ownership, supported environments, accessibility expectations, delivery target, and any AI-only implementation requirement.
4. Translate each requirement into an observable acceptance condition and a verification method. Assign stable requirement identifiers so later planning and QA can trace coverage.
5. Separate required behavior from optional visual enhancements. Identify dependency risks: missing content, unlicensed assets, unknown backend contracts, inaccessible references, and unavailable verification tools.
6. Ask focused questions only for decisions that materially change the result. Continue independent investigation. Mark optional assumptions as provisional rather than silently turning them into requirements.
7. Produce the brief without implementing code when the request is requirements-only. Respect any user approval boundary; do not add approval ceremonies to already authorized work.

## Decision rules
- Propose a fictional product only when authorized; label all mock claims and data.
- Never infer reference mobile behavior, real integrations, or deployment authorization from a visual brief.
- Record numerical budgets as agreed targets or proposals, not measured outcomes.

## Output
Create or update the project's requirements document when requested. Include product premise, audience, primary action, scope/non-goals, content and integrations, constraints, acceptance table, assumptions, and unresolved questions.

Use an acceptance table with columns: ID, requirement, observable result, verification method, and dependency. Example: selecting a workstream updates the shown records, preserves keyboard focus, and can be reset; verify by keyboard and touch interaction.

## Completion
Finish when each in-scope behavior has an acceptance condition, real versus simulated capabilities are explicit, and material uncertainties are visible. Do not claim implementation or verification has occurred.
