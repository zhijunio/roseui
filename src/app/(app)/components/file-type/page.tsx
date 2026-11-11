import { FileTypeExamples } from "@/components/examples/components/file-type/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "File Type" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="File Type" description="Usage examples for the File Type component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FileTypeExamples />
      </div>
    </div>
  );
}
