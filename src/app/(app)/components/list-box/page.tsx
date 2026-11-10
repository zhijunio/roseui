import { PageHeader } from "@/components/page-header";
import { ListBoxExamples } from "@/app/(app)/components/list-box/examples";

export const metadata = { title: "List Box" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="List Box" description="Usage examples for the List Box component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ListBoxExamples />
      </div>
    </div>
  );
}
