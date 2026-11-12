import { ComponentPreview } from "@/examples/component-preview";
import { AnimatedCounterDemo } from "@/examples/components/animated-counter-chart/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Animated Counter" };

export default function AnimatedCounterExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Animated Counter" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview title="Response count" layout="fullStack" span={2}>
          <AnimatedCounterDemo />
        </ComponentPreview>
      </div>
    </div>
  );
}
