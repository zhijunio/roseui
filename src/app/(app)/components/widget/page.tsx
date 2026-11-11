import { WidgetExamples } from "@/components/examples/components/widget/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Widget" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Widget" description="Usage examples for the Widget component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <WidgetExamples />
      </div>
    </div>
  );
}
