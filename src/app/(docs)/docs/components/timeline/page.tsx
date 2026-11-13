import { TimelineExamples } from "@/examples/components/timeline/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Timeline" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timeline" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimelineExamples />
      </div>
    </div>
  );
}
