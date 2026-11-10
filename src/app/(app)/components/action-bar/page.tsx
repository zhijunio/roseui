import { PageHeader } from "@/components/page-header";
import { ActionBarExamples } from "@/app/(app)/components/action-bar/examples";

export const metadata = { title: "Action Bar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Action Bar" description="Usage examples for the Action Bar component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ActionBarExamples />
      </div>
    </div>
  );
}
