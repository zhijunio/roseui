import { ContextMenuExamples } from "@/components/examples/context-menu/context-menu";

export const metadata = { title: "Context Menu" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ContextMenuExamples />
      </div>
    </div>
  );
}
