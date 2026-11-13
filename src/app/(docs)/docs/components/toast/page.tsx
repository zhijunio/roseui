import { ToastExamples } from "@/examples/components/toast/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Toast" };

export default function ToastPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Toast" />
      <ToastExamples />
    </div>
  );
}
