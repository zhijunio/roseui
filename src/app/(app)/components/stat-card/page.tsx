import { ComponentPreview } from "@/examples/component-preview";
import { StatCardExamples } from "@/examples/components/stat-card/examples";
import { PageHeader } from "@/examples/page-header";
export const metadata = { title: "Stat Card" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stat Card" />
      <ComponentPreview title="Workspace overview" layout="fullStack">
        <StatCardExamples />
      </ComponentPreview>
    </div>
  );
}
