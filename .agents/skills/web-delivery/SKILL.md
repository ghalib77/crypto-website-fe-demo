---
name: web-delivery
description: "Prepare a website handoff, completion report, or authorized deployment. Use when the implementation is ready for review, release preparation, or publishing to a specified host. Do not use as blanket deployment authorization, a provider-specific command substitute, or an implementation workflow."
---

# Web Delivery and Reporting

## Goal
Deliver a concrete reviewable result with truthful status, and verify deployment only when authorized.

## Workflow
1. Establish requested delivery scope: source handoff, preview, private deployment, or public release. Identify the target host, environment, audience, and existing user authorization; do not infer public publication from a request to build.
2. Read the accepted requirements and latest relevant validation evidence. Identify known defects, mock integrations, missing assets, environment needs, and checks not run. Reuse valid evidence rather than repeating every test without cause.
3. Prepare the reviewable artifact or preview. Preserve source/asset provenance and required notices. Do not expose secrets or include irrelevant local caches and generated dependencies in a handoff.
4. Discover the actual project build/deployment workflow and applicable provider skill. Follow that provider's current instructions; for a Sites project use the Sites hosting workflow when it applies. Do not guess provider commands or change providers without authorization.
5. Complete preparation and scoped checks before requesting any necessary release approval. If already authorized, proceed within that scope. Do not send messages or invitations to third parties without explicit authorization.
6. For authorized deployment, use the configured target, respect environment boundaries, and avoid unrelated settings or production-resource changes. Report a blocked deployment without presenting a local preview as published.
7. Verify the resulting URL, content, critical interactions, and asset loading after deployment. Record the deployed version and practical rollback route when available; never invent a release identifier or rollback capability.
8. Produce a concise completion report distinguishing implemented, tested, ready-for-review, and deployed status. Link only real artifacts and verified destinations through supported mechanisms.

## Output
Deliver the requested reviewable result and report: what changed, relevant checks actually run, deployment status, significant decisions, and remaining limitations. Identify simulated functionality explicitly.

## Completion
Finish when the requested handoff is accessible, reported status matches evidence, and any authorized deployment has been verified or a concrete blocker is disclosed. Leave publication pending only when required authorization or infrastructure is absent.
