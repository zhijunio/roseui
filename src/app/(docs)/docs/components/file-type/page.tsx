import { FileTypeExamples } from "@/examples/components/file-type/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "File Type" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="File Type" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FileTypeExamples />
      </div>
    </div>
  );
}
