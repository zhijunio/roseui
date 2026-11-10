import { PageHeader } from "@/components/page-header";
import { TimeFieldExamples } from "@/app/(app)/components/time-field/examples";

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
