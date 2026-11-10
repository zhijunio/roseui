import { PageHeader } from "@/components/page-header";
import { UndoToastExamples } from "@/app/(app)/components/undo-toast/examples";
export const metadata = { title: "Undo Toast" };
export default function Page() { return <div className="space-y-6"><PageHeader title="Undo Toast" description="Recover recent list changes before they are committed." /><UndoToastExamples /></div>; }
