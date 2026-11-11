import { ToggleGroupExamples } from "@/components/examples/components/toggle-group/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Toggle Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Toggle Group" description="Usage examples for the Toggle Group component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ToggleGroupExamples />
      </div>
    </div>
  );
}
