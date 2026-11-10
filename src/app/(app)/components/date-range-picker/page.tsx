import { PageHeader } from "@/components/page-header";
import { DateRangePickerExamples } from "@/app/(app)/components/date-range-picker/examples";

export const metadata = { title: "Date Range Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Date Range Picker" description="Usage examples for the Date Range Picker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DateRangePickerExamples />
      </div>
    </div>
  );
}
