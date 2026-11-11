import { ListViewExamples } from "@/components/examples/components/list-view/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "List View" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="List View" description="Usage examples for the List View component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ListViewExamples />
      </div>
    </div>
  );
}
