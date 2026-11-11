import { FieldExamples } from "@/components/examples/components/field/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Field" description="Usage examples for the Field component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FieldExamples />
      </div>
    </div>
  );
}
