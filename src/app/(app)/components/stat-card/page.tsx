import { ComponentPreview } from "@/components/examples/component-preview";
import { StatCardExamples } from "@/components/examples/components/stat-card/examples";
import { PageHeader } from "@/components/examples/page-header";
export const metadata = { title: "Stat Card" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stat Card" description="Summarize key workspace measures with context and direction." />
      <ComponentPreview title="Workspace overview" layout="fullStack">
        <StatCardExamples />
      </ComponentPreview>
    </div>
  );
}
