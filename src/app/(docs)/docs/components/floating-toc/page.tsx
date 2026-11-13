import { FloatingTocExamples } from "@/examples/components/floating-toc/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Floating Toc" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Floating Toc" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FloatingTocExamples />
      </div>
    </div>
  );
}
