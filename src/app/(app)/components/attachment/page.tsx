import { AttachmentExamples } from "@/components/examples/components/attachment/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Attachment" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attachment" description="Usage examples for the Attachment component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AttachmentExamples />
      </div>
    </div>
  );
}
