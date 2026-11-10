import { PageHeader } from "@/components/page-header";
import { ResizableExamples } from "./examples";

export const metadata = { title: "Resizable Workspace" };

export default function ResizableWorkspacePage() {
  return <div className="space-y-6"><PageHeader title="Resizable Workspace" description="Resize a workspace canvas and its activity panel with the project's accessible splitter." /><ResizableExamples /></div>;
}
