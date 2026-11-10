import { PageHeader } from "@/components/page-header";
import { TooltipExamples } from "@/app/(app)/components/tooltip/examples";

export const metadata = { title: "Tooltip" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tooltip" description="Usage examples for the Tooltip component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TooltipExamples />
      </div>
    </div>
  );
}
