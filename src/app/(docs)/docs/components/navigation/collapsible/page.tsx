import { CollapsibleExamples } from "@/components/examples/collapsible/collapsible";

export const metadata = { title: "Collapsible" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CollapsibleExamples />
      </div>
    </div>
  );
}
