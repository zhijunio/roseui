import { NotificationExamples } from "@/examples/components/notification/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Notification" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notification" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NotificationExamples />
      </div>
    </div>
  );
}
