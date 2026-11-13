import { SwitchExamples } from "@/examples/components/switch/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Switch" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Switch" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SwitchExamples />
      </div>
    </div>
  );
}
