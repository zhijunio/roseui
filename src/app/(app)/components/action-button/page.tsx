import { ActionButtonExamples } from "@/examples/components/action-button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Action Button" };

export default function ActionButtonExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Action Button" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ActionButtonExamples />
      </div>
    </div>
  );
}
