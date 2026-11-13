import { ScrollAreaExamples } from "@/examples/components/scroll-area/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Scroll Area" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scroll Area" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScrollAreaExamples />
      </div>
    </div>
  );
}
