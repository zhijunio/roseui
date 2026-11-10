import { PageHeader } from "@/components/page-header";
import { SeparatorExamples } from "@/app/(app)/components/separator/examples";

export const metadata = { title: "Separator" };

export default function SeparatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Separator"
        description="Separate related content with clear visual rhythm."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SeparatorExamples />
      </div>
    </div>
  );
}
