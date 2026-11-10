import { PageHeader } from "@/components/page-header";
import { TimePickerExamples } from "@/app/(app)/components/time-picker/examples";

export const metadata = { title: "Time Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Time Picker" description="Usage examples for the Time Picker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimePickerExamples />
      </div>
    </div>
  );
}
