# DESIGN.md — Hearthline / Progress Atlas

**Status: proposed; awaiting user approval.** This document defines visual and interaction intent for a single-page concept website. It does not authorize implementation. All values below are proposed design choices, not measurements of the reference sites.

## 1. Product premise and design authority

Working assumption: retain **Hearthline**, the fictional community-coordination product discussed in this project. Hearthline connects a proposal, contributor commitments, milestones, and evidence so a community can understand what it decided and what happened next. The premise remains subject to approval because no real product brief has been supplied.

Audience: community stewards, contributors, and members reviewing collective progress. The first screen must explain the benefit before inviting exploration.

Proposed headline: **Make every community move visible.** Supporting copy: **Connect decisions, commitments, and evidence in one shared project record.** Primary action: **Explore the demo**. Secondary action: **How it works**. Both navigate within the page.

The trial uses fictional sample data labeled **DEMO DATA**. It includes no real wallet connection, transaction, token sale, financial performance claim, or submission flow. A footer states that Hearthline is a fictional product concept.

This file controls visual hierarchy, layout, motion, interaction, responsive transformations, and visual quality. Product requirements remain governed by the user's instructions. Future token files should encode the approved values; implementation architecture belongs in a separate plan.

## 2. Reference evidence and limits

Inspection date: **30 September 2026, Asia/Jakarta**. All four HTTPS homepages were opened in the live browser. The observed desktop viewport was **1363 × 936 CSS pixels**. Only rendered pages, accessibility representations, and viewport dimensions were inspected; website source code, bundled JavaScript, and library source were not inspected.

**Mobile inspection remains incomplete for all four sites.** The available browser API has no supported viewport-resizing or device-emulation control. Device-mode and zoom keyboard attempts did not change the measured viewport. A cropped desktop screenshot would not establish mobile behavior. The responsive requirements in this proposal are authored requirements, not claims about the references.

| Reference and inspected state | Direct observations | Useful principle | Original adaptation |
| --- | --- | --- | --- |
| [Kobo](https://kobo.work/) — workshop and selected instrument panel | Dense green/cream instrument field; small technical navigation and labels; continuously changing displays. Selecting an instrument opens a light panel with its description and actions. A sampled keyboard focus state outlined an instrument. | An expressive object can reveal a useful, legible explanation. | A sparse four-node progress atlas with adjacent HTML detail; no instrument mosaic, mascot, or reference palette. |
| [Shillora](https://shillora.fun/) — entry, main hero, Rewards selection, campaign/process sections, closing and footer | Purple night scene; large sans headlines with italic serif emphasis; orbital particles and illustrated tokens; three stage controls. Choosing Rewards visibly changed the selected control and explanatory sentence. Lower sections combine illustrated cards, a three-step mechanism, and a configuration preview. | Tie the rich visual to a readable process and let visitors choose the explanation. | Four plain-language stages and a shared progress path, without galaxy rings, token characters, purple glow, serif punchlines, or an entry gate. |
| [Gained](https://gained-pad.xyz/) — loading screen, entry, overview, motion control, lower-page/footer views | Near-black surfaces, monochrome particles shaped into a mark, large sparse entrance type, technical labels, and a pause/resume control. The overview accessibility representation exposed metrics, a token table, activity, and three stages. Several content regions appeared blank or dim in rendered views even after a reload; their complete visual presentation could not be verified. | Restraint and a clear motion control are useful; content should remain visible independent of reveals. | Restrained etched contours and persistent copy, without a particle logo, token table, or copied financial metrics. |
| [Foretell](https://foretell-market.xyz/) — entrance, market overview, Technology filter | Dark blue surfaces, cyan line visual with apparent depth, a category sidebar, search/sort controls, and repeated market cards. Selecting Technology reduced the visible set to four cards and changed the results heading. | A bounded expressive visual can coexist with clear selection and dense information. | A compact workstream selector and readable evidence records, without market questions, trading actions, probability graphs, or a dashboard shell. |

The shared pattern is **expressive visual → concise explanation → selectable examples**. Exact typefaces, rendering engines, libraries, frame rates, and performance scores were not verified. Apparent depth is a visual observation, not proof of WebGL. Entry transitions were observed, but their exact timings were not measured. These inspections do not establish accessibility compliance or full keyboard coverage.

Adopt: strong headline hierarchy, small technical labels, bounded interactive visuals, explicit selected states. Adapt: explanatory stage selection and framed records. Avoid: compulsory entrance screens, sound gates, multiple competing animated regions, and critical content hidden until an animation completes.

## 3. Visual concept

**Progress Atlas:** a precise, tactile map of collective work. Four nodes mark **Proposal → Commitment → Milestone → Evidence** across a shallow landscape of etched contour lines. The selected node brightens, its path becomes clearer, and a neighboring sentence explains its role.

Use warm charcoal, off-white text, mineral copper, flat surfaces, and generous negative space. Give the page an editorial rhythm: an expansive opening, a compact explanation, a denser working example, then a quiet closing.

One visually rich moment per viewport is the governing rule. The atlas provides spatial continuity; product information stays in the reading order. Depth comes from layering and restrained lighting rather than glass blur or widespread glow.

Originality boundaries: create the contour geometry and wordmark independently. Do not reproduce reference marks, mascots, particle-logo forms, orbital rings, instrument grids, financial cards, copy, or artwork. Avoid generic stock illustrations unrelated to coordination.

## 4. Page structure and narrative

| Order | Section | Content and composition | Behavior |
| --- | --- | --- | --- |
| 0 | Navigation | Hearthline wordmark; How it works, Explore, The record; primary Explore demo action. | Native anchors; current section indicated by text weight and a copper rule. Sticky navigation must not obscure anchor targets. |
| 1 | Hero | Product promise and two actions on the left; atlas with four stage controls on the right. A short Concept demo label sets expectations. | Proposal selected initially. Selecting a stage updates one sentence and the atlas. Pause motion sits beside the visual. |
| 2 | How it works | Three numbered steps: Set a direction, Gather commitments, Show the work. Use open columns separated by fine rules rather than three identical decorative cards. | Optional buttons select the corresponding atlas stage. Scrolling does not override explicit user selection. |
| 3 | Explore | Fictional Open Access Toolkit project; workstream controls; milestone path; compact status explanation. This is the densest section. | Design, Build, Review, and View all select/filter demo records. Updates preserve focus and are reversible. |
| 4 | The record | Decision, Commitment, and Evidence records with source context and DEMO DATA labels. | Inline disclosures reveal additional mock context; headings and summaries remain visible. |
| 5 | Closing and footer | A shared path makes progress easier to trust. Repeat Explore the demo; concept disclosure and in-page links. | Quiet interaction; no new visual spectacle or invented conversion flow. |

Sample project: **Open Access Toolkit**, a fictional accessibility starter kit for community websites. Design covers component patterns; Build covers starter templates; Review covers accessibility checks. Milestones: Scope agreed, Prototype ready, Guide published. Evidence consists of mock design notes, prototype summaries, and a review checklist. Do not imply the visitor has changed an actual community record.

Atlas stage explanation examples: Proposal — a clear goal establishes the starting point; Commitment — people can see the work they own; Milestone — the next deliverable becomes visible; Evidence — the record shows what was completed.

## 5. Layout and spacing

Use a maximum content width near **1360 px**. Wide layouts use a twelve-column alignment grid, with a roughly five/seven hero split. Body copy stays around **50–70 characters per line**. Dense content belongs in Explore; the hero keeps a generous margin around its message.

Use a constrained **4/8 px rhythm**: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Apply 4–8 to tightly related labels, 12–16 within controls, 24–32 within panels, and 64–128 between narrative sections.

Wide gutters: approximately 48–64 px. Narrow gutters: 20–24 px, reducing to 16 px only where necessary at 320 px. Section gaps reduce from 96–128 px to 64–80 px on narrow layouts. Align headings, dividers, and section edges; permit variation in composition while keeping the same rhythm.

## 6. Typography system

Propose **Manrope** for headings and body, and **IBM Plex Mono** for indices, stage labels, and short metadata. Confirm distribution licensing before asset inclusion. Use system sans and monospace fallbacks; font loading must not block readable text. Do not use monospace for paragraphs or imitate the references' display treatments.

| Role | Wide target | Narrow target | Rules |
| --- | --- | --- | --- |
| Hero | 72–96 px | 40–56 px | Weight 600; line height 1.05–1.1; deliberate breaks without splitting words. |
| Section title | 40–52 px | 30–38 px | Weight 600; line height around 1.15. |
| Record title | 22–28 px | 20–24 px | Weight 600; permit wrapping. |
| Body | 18–20 px | 16–18 px | Weight 400; line height 1.5–1.65. |
| Control | 14–16 px | 14–16 px | Clear verbs, sentence case, weight 500–600. |
| Metadata | 12–13 px | 12–13 px | Mono, short strings; uppercase limited to eyebrows and indices. |

Scale fluidly between ranges. Longer content and 200% zoom must remain readable. Do not reduce essential label size to preserve a layout.

## 7. Semantic color and surfaces

These are proposed initial token values, to be encoded once approved.

| Role | Value | Use |
| --- | --- | --- |
| Canvas | `#111715` | Page background |
| Surface | `#1B2622` | Demo panels and controls |
| Primary text | `#F2EFE6` | Headings and body |
| Secondary text | `#B9C6BD` | Supporting text and metadata |
| Accent | `#D58A62` | Primary action and selected atlas path |
| Decorative rule | `#43524A` | Nonessential separators |
| Control boundary | `#84968A` | Meaningful outlines and control edges |
| Focus | `#FFD36B` | Keyboard focus indicator |

Copper occupies a small portion of the page. On copper-filled controls, use canvas-colored text. Decorative rules may be subtle; meaningful control boundaries must meet non-text contrast requirements. Selection includes a label/shape/weight change in addition to color. Validate actual combinations in every interactive state before claiming compliance.

Surfaces use 1 px borders and **8–12 px radii**. Use no persistent glass blur. Shadows are reserved for an overlay or clear overlap, not every card. Atlas depth comes from contour layering; ordinary reading surfaces remain flat.

## 8. Component and interaction language

- **Primary action:** filled copper, concise verb, at least 44 px target height. Hover changes luminance subtly; press gives immediate feedback; focus uses a distinct outer ring.
- **Secondary action:** outlined or text with a clear arrow and generous hit area. Keep visible affordance independent of hover.
- **Stage/workstream selectors:** wrapping labeled controls. Selected state combines a strong outline, text weight, and exposed state. Use a control pattern whose keyboard behavior matches its semantics.
- **Records:** numbered eyebrow, title, status label, short summary, optional disclosure. Different record types share anatomy without requiring identical widths or decoration.
- **Disclosures:** inline expansion with an explicit expanded state. Preserve focus on the trigger; do not make decorative canvas objects the only disclosure mechanism.
- **Mobile menu:** a labeled Menu disclosure; expose open/closed state and support Escape. For a simple nonmodal menu, avoid trapping focus.
- **Loading/error:** the atlas region retains its dimensions and displays the static diagram. Controls remain active and readable; an enhancement failure does not produce a page-wide error.

Hover previews must not commit selection. Clicking, tapping, or keyboard activation commits the same persistent state. Selecting another filter or View all resets predictably. Avoid scroll-controlled state that competes with intentional input.

## 9. Animation language

| Category | Proposed character | Purpose and constraint |
| --- | --- | --- |
| Control feedback | 120–180 ms | Immediate confirmation; no excessive button displacement. |
| Stage transition | 220–360 ms | Crossfade/short path emphasis ties text to the selected stage. |
| Optional entrance | 400–600 ms, translation at most 12 px | Introduce depth; headline and primary action remain visible and usable from first paint. |
| Ambient contour drift | Slow 16–24 second cycle | Suggest ongoing work with very small amplitude, no autonomous camera spin. |

Use gentle ease-out for settling and linear/smooth cyclical motion for ambience. Prefer transform and opacity for ordinary UI. Do not stage a long cinematic gate, play sound automatically, flash, hijack scrolling, or animate every section.

Pause/resume stops the ambient visual loop without disabling selection. With reduced motion, render a stable scene, remove pointer parallax and drift, and apply immediate or very short state changes. Readability and record disclosure must never depend on reveal completion.

## 10. 3D and imagery concept

Purpose: make the relationship between decisions and evidence understandable through a small amount of depth. The scene contains **three shallow contour planes, four simple nodes, and a single connecting path**. Use original procedural geometry, matte mineral surfaces, one soft key light, and restrained copper emphasis. Avoid complex models, dense particle systems, bloom, and photorealism.

Use a fixed oblique camera with tightly bounded pointer response, approximately a few degrees. No free orbit is necessary. Essential labels and controls live in HTML outside the rendering surface; camera position never hides information. Scroll may bring the region into view but does not force a camera journey.

The hero contains the only 3D scene. Lower sections use lightweight diagrams and records rather than duplicate canvases. On narrow screens, reduce contour count and depth, keep nodes separated, and remove hover-only behavior. A static SVG showing the same four stages is the loading, failure, reduced-motion, and low-resource alternative.

Illustration and icon assets should share a simple line grammar and consistent stroke weight. Use a text wordmark initially. No external photographic assets are required. Fonts are the only proposed external visual dependency; any added assets require documented provenance.

## 11. Responsive transformations

These are **proposed requirements**, not verified reference behaviors. Breakpoints are provisional and should move when the content fails, rather than being tied to a device model.

| Available width | Transformation |
| --- | --- |
| Wide, roughly 1200 px and above | Split hero; three open process columns; Explore controls beside results; three record columns where content fits. |
| Intermediate, roughly 768–1199 px | Reduce hero gap; stack before the headline becomes cramped. Explore becomes a top control row above results; records can use two columns. |
| Narrow, below roughly 768 px | Message and actions first, atlas below in a reserved 280–340 px region. Menu disclosure replaces navigation links. Steps and records stack; selectors wrap instead of requiring horizontal scrolling. |

At 320 px, there must be no horizontal page overflow. Preserve every primary explanation and demo control. Make targets approximately 44 × 44 px or larger. In short landscape views, let content grow naturally rather than forcing viewport-height sections. At 200% zoom, support reflow and avoid overlapping fixed navigation. Accommodate longer copy without fixed-height text containers.

## 12. Accessibility and content

Design toward WCAG 2.2 AA. Use one page heading and logical section headings, landmarks, a skip link, descriptive actions, and visible focus. Ensure focused content is not obscured by the sticky header.

Require normal text contrast of at least 4.5:1; large text and meaningful UI boundaries at least 3:1. State is communicated with text and structure as well as color. The atlas has a concise description and corresponding HTML controls; decorative geometry stays outside the reading order.

All interactions work with keyboard and touch. No essential drag, pointer movement, or hover is required. Announce meaningful filter-result changes with a restrained live region, without repeatedly announcing selected-node animation.

Use plain language and sentence case. Explain community-coordination concepts before introducing jargon. Keep demo labels visible near the examples, not only in the footer. Never invent partners, testimonials, traction, or real execution states.

## 13. Performance constraints

Core message, navigation, and primary actions must render without waiting for fonts or the 3D scene. Load the heavier visual after usable content, reserve its dimensions, pause it offscreen/when hidden, and provide the static alternative on failure or constrained resources.

Proposed measurement targets: **LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms**, under documented test conditions. These are targets, not measured results or a promise of field performance. Aim for smooth desktop interaction; reduce effects if a representative mobile device cannot maintain responsive input and stable rendering.

Use a pixel-ratio cap, a small procedural scene, and no large texture or model downloads. Avoid autoplay video, multiple WebGL contexts, per-frame layout reads, and React state updates for ambient motion. Establish concrete transferred-byte and scene budgets in the implementation plan after measuring the scaffold; do not report unmeasured bundle claims.

## 14. Verification and approval boundary

Before implementation acceptance, inspect wide/intermediate/narrow layouts, 320 px reflow, mobile landscape, long content, and 200% zoom. Exercise navigation, menu dismissal, keyboard focus, stage selection, workstream reset, disclosures, pause/resume, reduced motion, loading, disabled enhancement, and scene failure. Compare HTML and visual states for consistency. Record actual device/emulation and performance conditions.

Outstanding evidence: mobile layouts and touch interaction on all four references; reference reduced-motion behavior; exact typography and rendering technology; complete Gained reveal behavior in this browser. Do not treat these as verified. A further reference inspection with supported viewport controls is needed to complete the requested desktop/mobile comparison.

Approval requested for: the provisional Hearthline premise, Progress Atlas concept, palette and typography, section narrative, demo interactions, 3D enhancement/fallback, and responsive requirements. No application implementation or publication begins until the user approves. Approval of the original direction does not erase the outstanding mobile-inspection gap.
