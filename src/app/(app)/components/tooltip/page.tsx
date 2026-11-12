import { TooltipExamples } from "@/examples/components/tooltip/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Tooltip" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tooltip" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TooltipExamples />
      </div>
    </div>
  );
}
