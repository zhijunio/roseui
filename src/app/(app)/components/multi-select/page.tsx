import { MultiSelectExamples } from "@/components/examples/components/multi-select/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Multi-select" };

export default function MultiSelectPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-select"
        description="Choose several fixed options and keep the selected values visible."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MultiSelectExamples />
      </div>
    </div>
  );
}
