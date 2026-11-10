import { PageHeader } from "@/components/page-header";
import { ConfirmPopoverExamples } from "@/app/(app)/components/confirm-popover/examples";

export const metadata = { title: "Confirm Popover" };

export default function ConfirmPopoverPage() { return <div className="space-y-6"><PageHeader title="Confirm Popover" description="Confirm consequential actions without taking the user away from their task." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><ConfirmPopoverExamples /></div></div>; }
