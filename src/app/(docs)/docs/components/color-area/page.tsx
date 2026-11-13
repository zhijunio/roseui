import { ColorAreaExamples } from "@/examples/components/color-area/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Color Area" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Area" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorAreaExamples />
      </div>
    </div>
  );
}
