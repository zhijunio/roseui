import { PageHeader } from "@/components/page-header";
import { TrendChipExamples } from "@/app/(app)/components/trend-chip/examples";

export const metadata = { title: "Trend Chip" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Trend Chip" description="Usage examples for the Trend Chip component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TrendChipExamples />
      </div>
    </div>
  );
}
