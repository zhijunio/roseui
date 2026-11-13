import { HoverCardExamples } from "@/examples/components/hover-card/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Hover Card" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hover Card" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HoverCardExamples />
      </div>
    </div>
  );
}
