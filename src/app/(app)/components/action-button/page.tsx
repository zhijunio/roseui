import { ActionButtonExamples } from "@/app/(app)/components/action-button/examples";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Action Button" };

export default function ActionButtonExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Action Button"
        description="Show progress and completion for a single asynchronous action."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ActionButtonExamples />
      </div>
    </div>
  );
}
