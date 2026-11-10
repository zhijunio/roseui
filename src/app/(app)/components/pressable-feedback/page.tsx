import { PageHeader } from "@/components/page-header";
import { HoldToConfirmExamples } from "@/app/(app)/components/pressable-feedback/examples";

export const metadata = { title: "Hold to Confirm" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hold to Confirm" description="Confirm a consequential action by holding the control until its progress completes." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HoldToConfirmExamples />
      </div>
    </div>
  );
}
