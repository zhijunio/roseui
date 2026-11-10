import { JsonViewerExamples } from "@/app/(app)/components/json-viewer/examples";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "JSON Viewer" };

export default function JsonViewerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="JSON Viewer" description="Search structured payloads, inspect nested values, and copy a value or its path." />
      <JsonViewerExamples />
    </div>
  );
}
