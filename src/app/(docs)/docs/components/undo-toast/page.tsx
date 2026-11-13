import { UndoToastExamples } from "@/examples/components/undo-toast/examples";
import { PageHeader } from "@/examples/page-header";
export const metadata = { title: "Undo Toast" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Undo Toast" />
      <UndoToastExamples />
    </div>
  );
}
