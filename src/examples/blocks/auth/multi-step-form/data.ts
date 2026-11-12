export const steps = [
  { title: "Workspace", description: "Name your workspace" },
  { title: "Preferences", description: "Set your defaults" },
  { title: "Review", description: "Confirm details" },
] as const;

export type Step = (typeof steps)[number];
export type WorkspaceRole = "admin" | "manager" | "member";
