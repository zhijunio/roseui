import { PageHeader } from "@/components/page-header";
import { HoverCardExamples } from "@/app/(app)/components/hover-card/examples";

export const metadata = { title: "Hover Card" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hover Card" description="Usage examples for the Hover Card component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HoverCardExamples />
      </div>
    </div>
  );
}
