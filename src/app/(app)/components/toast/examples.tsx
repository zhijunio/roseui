"use client";

import { toast } from "sonner";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";

export function ToastExamples() {
  return <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
    <ComponentPreview previewId="toast-01" title="Status Feedback"><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => toast.success("Changes saved", { description: "Your workspace settings are up to date." })}>Success</Button><Button variant="outline" onClick={() => toast.info("Upload complete", { description: "Quarterly report.pdf is ready." })}>Information</Button><Button variant="outline" onClick={() => toast.warning("Storage is almost full", { description: "You have used 92% of your workspace quota." })}>Warning</Button><Button variant="outline" onClick={() => toast.error("Could not save changes", { description: "Check your connection and try again." })}>Error</Button></div></ComponentPreview>
    <ComponentPreview previewId="toast-02" title="Action and Undo"><Button variant="outline" onClick={() => toast("Project archived", { description: "Acme Dashboard moved to the archive.", action: { label: "Undo", onClick: () => toast.success("Project restored") } })}>Archive project</Button></ComponentPreview>
    <ComponentPreview previewId="toast-03" title="Loading and Completion"><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), { loading: "Preparing export…", success: "Export completed", error: "Export failed" })}>Run export</Button><Button variant="outline" onClick={() => toast.dismiss()}>Dismiss all</Button></div></ComponentPreview>
  </div>;
}
