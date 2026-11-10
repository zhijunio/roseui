import { PageHeader } from "@/components/page-header";
import { DatePickerExamples } from "@/app/(app)/components/date-picker/examples";

export const metadata = { title: "Date Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Date Picker" description="Usage examples for the Date Picker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DatePickerExamples />
      </div>
    </div>
  );
}
