import { ListBoxExamples } from "@/examples/components/list-box/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "List Box" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="List Box" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ListBoxExamples />
      </div>
    </div>
  );
}
