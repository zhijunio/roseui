import { ListViewExamples } from "@/examples/components/list-view/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "List View" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="List View" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ListViewExamples />
      </div>
    </div>
  );
}
