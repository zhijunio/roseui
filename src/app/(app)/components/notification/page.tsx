import { PageHeader } from "@/components/page-header";
import { NotificationExamples } from "@/app/(app)/components/notification/examples";

export const metadata = { title: "Notification" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notification" description="Usage examples for the Notification component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NotificationExamples />
      </div>
    </div>
  );
}
