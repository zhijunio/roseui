import { PopoverExamples } from "@/components/examples/components/popover/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Popover" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Popover" description="Usage examples for the Popover component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PopoverExamples />
      </div>
    </div>
  );
}
