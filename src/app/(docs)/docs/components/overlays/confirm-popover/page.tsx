import { ConfirmPopoverExamples } from "@/components/examples/confirm-popover/confirm-popover";

export const metadata = { title: "Confirm Popover" };

export default function ConfirmPopoverPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ConfirmPopoverExamples />
      </div>
    </div>
  );
}
