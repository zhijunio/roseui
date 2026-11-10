import { PageHeader } from "@/components/page-header";
import { FileUploadExamples } from "@/app/(app)/components/file-upload/examples";

export const metadata = { title: "File Upload" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="File Upload" description="Usage examples for the File Upload component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FileUploadExamples />
      </div>
    </div>
  );
}
