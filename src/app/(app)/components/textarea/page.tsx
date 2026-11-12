import { TextareaExamples } from "@/examples/components/textarea/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Textarea" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Textarea" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TextareaExamples />
      </div>
    </div>
  );
}
