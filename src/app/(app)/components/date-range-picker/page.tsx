import { DateRangePickerExamples } from "@/examples/components/date-range-picker/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Date Range Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Date Range Picker" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DateRangePickerExamples />
      </div>
    </div>
  );
}
