import { ScrollspyExamples } from "@/examples/components/scrollspy/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Scrollspy" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scrollspy" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScrollspyExamples />
      </div>
    </div>
  );
}
