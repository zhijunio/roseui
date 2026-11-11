import { SliderExamples } from "@/components/examples/components/slider/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Slider" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Slider" description="Usage examples for the Slider component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SliderExamples />
      </div>
    </div>
  );
}
