import { ToolbarExamples } from "@/examples/components/toolbar/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Toolbar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Toolbar" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ToolbarExamples />
      </div>
    </div>
  );
}
