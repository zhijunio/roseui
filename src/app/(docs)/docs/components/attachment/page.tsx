import { AttachmentExamples } from "@/examples/components/attachment/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Attachment" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attachment" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AttachmentExamples />
      </div>
    </div>
  );
}
