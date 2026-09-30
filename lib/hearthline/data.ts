export const stages = [
  {
    name: "Proposal",
    title: "A direction worth sharing.",
    copy: "A clear goal establishes the starting point. Give every decision a reason, a scope, and a place to begin.",
  },
  {
    name: "Commitment",
    title: "Good intentions, clear ownership.",
    copy: "People can see the work they own. Connect each commitment to a contributor and a shared next step.",
  },
  {
    name: "Milestone",
    title: "Make the next step visible.",
    copy: "The next deliverable becomes visible. Follow meaningful milestones without losing sight of the bigger picture.",
  },
  {
    name: "Evidence",
    title: "Let the work leave a record.",
    copy: "The record shows what was completed. Keep the notes, outcomes, and context alongside the original decision.",
  },
] as const;
export type Workstream = "all" | "Design" | "Build" | "Review";
export const records = [
  {
    id: "DS-01",
    stream: "Design",
    title: "A shared component language",
    summary: "Accessible patterns for the places a community gathers.",
    status: "Complete",
    owner: "Mira",
    initials: "MK",
    milestone: 0,
  },
  {
    id: "DS-02",
    stream: "Design",
    title: "Interaction notes",
    summary: "Focus states, readable labels, and thoughtful defaults.",
    status: "Complete",
    owner: "Mira",
    initials: "MK",
    milestone: 1,
  },
  {
    id: "BL-01",
    stream: "Build",
    title: "The starter template",
    summary: "Reusable foundations that turn the patterns into a working site.",
    status: "In progress",
    owner: "Leo",
    initials: "LC",
    milestone: 1,
  },
  {
    id: "BL-02",
    stream: "Build",
    title: "An implementation guide",
    summary: "A practical route from a blank page to a useful community tool.",
    status: "Planned",
    owner: "Leo",
    initials: "LC",
    milestone: 2,
  },
  {
    id: "RV-01",
    stream: "Review",
    title: "A keyboard-first walkthrough",
    summary: "Follow every action, from the first link to the last disclosure.",
    status: "In progress",
    owner: "Asha",
    initials: "AP",
    milestone: 1,
  },
  {
    id: "RV-02",
    stream: "Review",
    title: "The accessibility checklist",
    summary:
      "Document the checks, the findings, and what still needs attention.",
    status: "Planned",
    owner: "Asha",
    initials: "AP",
    milestone: 2,
  },
] as const;
export const milestones = [
  "Scope agreed",
  "Prototype ready",
  "Guide published",
];
