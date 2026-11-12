import { ConfirmPopoverExamples } from "@/examples/components/confirm-popover/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Confirm Popover" };

export default function ConfirmPopoverPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Confirm Popover" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ConfirmPopoverExamples />
      </div>
    </div>
  );
}
