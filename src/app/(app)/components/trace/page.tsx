import { TraceExamples } from "@/components/examples/components/trace/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Trace" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Trace" description="Usage examples for the Trace component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TraceExamples />
      </div>
    </div>
  );
}
