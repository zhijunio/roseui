import { TimeFieldExamples } from "@/components/examples/components/time-field/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Time Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Time Field" description="Usage examples for the Time Field component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimeFieldExamples />
      </div>
    </div>
  );
}
