import { PageHeader } from "@/components/page-header";
import { DialogExamples } from "@/app/(app)/components/dialog/examples";

export const metadata = { title: "Dialog" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dialog" description="Usage examples for the Dialog component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DialogExamples />
      </div>
    </div>
  );
}
