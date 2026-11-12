import { SheetExamples } from "@/examples/components/sheet/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Sheet" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sheet" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SheetExamples />
      </div>
    </div>
  );
}
