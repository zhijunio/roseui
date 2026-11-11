import { TimelineExamples } from "@/components/examples/components/timeline/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Timeline" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timeline" description="Usage examples for the Timeline component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimelineExamples />
      </div>
    </div>
  );
}
