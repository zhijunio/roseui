import { JsonViewerExamples } from "@/components/examples/json-viewer/json-viewer";

export const metadata = { title: "JSON Viewer" };

export default function JsonViewerPage() {
  return (
    <div className="space-y-6">
      <JsonViewerExamples />
    </div>
  );
}
