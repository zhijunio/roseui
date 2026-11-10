import { PageHeader } from "@/components/page-header";
import { AlertDialogExamples } from "@/app/(app)/components/alert-dialog/examples";

export const metadata = { title: "Alert Dialog" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Alert Dialog" description="Usage examples for the Alert Dialog component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AlertDialogExamples />
      </div>
    </div>
  );
}
