import { PageHeader } from "@/components/page-header";
import { ColorSliderExamples } from "@/app/(app)/components/color-slider/examples";

export const metadata = { title: "Color Slider" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Slider" description="Usage examples for the Color Slider component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorSliderExamples />
      </div>
    </div>
  );
}
