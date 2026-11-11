import { HoldToConfirmExamples } from "@/components/examples/components/pressable-feedback/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Hold to Confirm" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hold to Confirm"
        description="Confirm a consequential action by holding the control until its progress completes."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <HoldToConfirmExamples />
      </div>
    </div>
  );
}
