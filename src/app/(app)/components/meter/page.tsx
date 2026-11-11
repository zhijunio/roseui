import { MeterExamples } from "@/components/examples/components/meter/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Meter" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Meter" description="Usage examples for the Meter component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MeterExamples />
      </div>
    </div>
  );
}
