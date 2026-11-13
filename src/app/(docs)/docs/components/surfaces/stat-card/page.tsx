import { ComponentPreview } from "@/components/docs/component-preview";
import { StatCardExamples } from "@/components/examples/stat-card/stat-card";
export const metadata = { title: "Stat Card" };
export default function Page() {
  return (
    <div className="space-y-6">
      <ComponentPreview title="Workspace overview" layout="fullStack">
        <StatCardExamples />
      </ComponentPreview>
    </div>
  );
}
