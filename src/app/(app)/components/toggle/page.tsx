import { PageHeader } from "@/components/page-header";
import { ToggleExamples } from "@/app/(app)/components/toggle/examples";

export const metadata = { title: "Toggle" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Toggle" description="Usage examples for the Toggle component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ToggleExamples />
      </div>
    </div>
  );
}
