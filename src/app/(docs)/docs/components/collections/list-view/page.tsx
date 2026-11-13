import { ListViewExamples } from "@/components/examples/list-view/list-view";

export const metadata = { title: "List View" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ListViewExamples />
      </div>
    </div>
  );
}
