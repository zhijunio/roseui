import { PageHeader } from "@/components/page-header";
import { ContextMenuExamples } from "@/app/(app)/components/context-menu/examples";

export const metadata = { title: "Context Menu" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Context Menu" description="Usage examples for the Context Menu component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ContextMenuExamples />
      </div>
    </div>
  );
}
