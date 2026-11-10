import { PageHeader } from "@/components/page-header";
import { SidebarExamples } from "./examples";

export const metadata = { title: "Sidebar Behavior" };

export default function SidebarBehaviorPage() {
  return <div className="space-y-6"><PageHeader title="Sidebar Behavior" description="Compare the sidebar collapse styles and placement supported by the current Sidebar component." /><SidebarExamples /></div>;
}
