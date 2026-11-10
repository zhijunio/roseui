import { PageHeader } from "@/components/page-header";
import { SheetExamples } from "@/app/(app)/components/sheet/examples";

export const metadata = { title: "Sheet" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sheet" description="Usage examples for the Sheet component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SheetExamples />
      </div>
    </div>
  );
}
