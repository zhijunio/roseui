import { PageHeader } from "@/components/page-header";
import { WorkspaceExamples } from "./examples";

export const metadata = { title: "Workspace Shell" };

export default function WorkspaceShellPage() {
  return <div className="space-y-6"><PageHeader title="Workspace Shell" description="A full application shell with workspace navigation, header actions, a content toolbar, and a footer." /><WorkspaceExamples /></div>;
}
