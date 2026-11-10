import { PageHeader } from "@/components/page-header";
import { TextareaExamples } from "@/app/(app)/components/textarea/examples";

export const metadata = { title: "Textarea" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Textarea" description="Usage examples for the Textarea component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TextareaExamples />
      </div>
    </div>
  );
}
