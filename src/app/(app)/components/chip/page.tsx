import { ChipExamples } from "@/components/examples/components/chip/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Chip" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Chip" description="Usage examples for the Chip component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ChipExamples />
      </div>
    </div>
  );
}
