import { PageHeader } from "@/components/page-header";
import { SwitchExamples } from "@/app/(app)/components/switch/examples";

export const metadata = { title: "Switch" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Switch" description="Usage examples for the Switch component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SwitchExamples />
      </div>
    </div>
  );
}
