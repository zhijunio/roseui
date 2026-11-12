import { ProgressExamples } from "@/examples/components/progress/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Progress" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Progress" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ProgressExamples />
      </div>
    </div>
  );
}
