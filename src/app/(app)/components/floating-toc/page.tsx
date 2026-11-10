import { PageHeader } from "@/components/page-header";
import { FloatingTocExamples } from "@/app/(app)/components/floating-toc/examples";

export const metadata = { title: "Floating Toc" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Floating Toc" description="Usage examples for the Floating Toc component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FloatingTocExamples />
      </div>
    </div>
  );
}
