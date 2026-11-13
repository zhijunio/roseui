import { TraceExamples } from "@/examples/components/trace/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Trace" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Trace" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TraceExamples />
      </div>
    </div>
  );
}
