import { ToastExamples } from "@/components/examples/components/toast/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Toast" };

export default function ToastPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Toast" description="Give people brief feedback about completed or ongoing actions." />
      <ToastExamples />
    </div>
  );
}
