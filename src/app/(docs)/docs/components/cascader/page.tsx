import { CascaderExamples } from "@/examples/components/cascader/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Cascader" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Cascader" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CascaderExamples />
      </div>
    </div>
  );
}
