import { CascaderExamples } from "@/components/examples/components/cascader/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Cascader" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Cascader" description="Usage examples for the Cascader component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CascaderExamples />
      </div>
    </div>
  );
}
