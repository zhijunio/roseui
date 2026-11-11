import { UndoToastExamples } from "@/components/examples/components/undo-toast/examples";
import { PageHeader } from "@/components/examples/page-header";
export const metadata = { title: "Undo Toast" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Undo Toast" description="Recover recent list changes before they are committed." />
      <UndoToastExamples />
    </div>
  );
}
