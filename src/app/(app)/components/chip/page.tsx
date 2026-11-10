import { PageHeader } from "@/components/page-header";
import { ChipExamples } from "@/app/(app)/components/chip/examples";

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
