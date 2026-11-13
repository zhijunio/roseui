import { RichTextEditorExamples } from "@/examples/components/rich-text-editor/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Rich Text Editor" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rich Text Editor" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RichTextEditorExamples />
      </div>
    </div>
  );
}
