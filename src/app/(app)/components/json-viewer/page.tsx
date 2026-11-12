import { JsonViewerExamples } from "@/examples/components/json-viewer/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "JSON Viewer" };

export default function JsonViewerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="JSON Viewer" />
      <JsonViewerExamples />
    </div>
  );
}
