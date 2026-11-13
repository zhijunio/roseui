import { FileUploadExamples } from "@/examples/components/file-upload/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "File Upload" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="File Upload" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FileUploadExamples />
      </div>
    </div>
  );
}
