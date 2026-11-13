import { DateFieldExamples } from "@/examples/components/date-field/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Date Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Date Field" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DateFieldExamples />
      </div>
    </div>
  );
}
