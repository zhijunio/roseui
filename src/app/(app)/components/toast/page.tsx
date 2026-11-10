import { PageHeader } from "@/components/page-header";
import { ToastExamples } from "@/app/(app)/components/toast/examples";

export const metadata = { title: "Toast" };

export default function ToastPage() {
  return <div className="space-y-6"><PageHeader title="Toast" description="Give people brief feedback about completed or ongoing actions." /><ToastExamples /></div>;
}
