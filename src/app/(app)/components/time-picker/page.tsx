import { TimePickerExamples } from "@/components/examples/components/time-picker/examples";
import { PageHeader } from "@/components/examples/page-header";

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
