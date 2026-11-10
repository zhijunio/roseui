import { PageHeader } from "@/components/page-header";
import { CodeBlockExamples } from "@/app/(app)/components/code-block/examples";

export const metadata = { title: "Code Block" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Code Block" description="Usage examples for the Code Block component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CodeBlockExamples />
      </div>
    </div>
  );
}
