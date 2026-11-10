import { PageHeader } from "@/components/page-header";
import { RichTextEditorExamples } from "@/app/(app)/components/rich-text-editor/examples";

export const metadata = { title: "Rich Text Editor" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rich Text Editor" description="Usage examples for the Rich Text Editor component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RichTextEditorExamples />
      </div>
    </div>
  );
}
