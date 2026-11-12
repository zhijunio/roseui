import { RulerSliderExamples } from "@/examples/components/ruler-slider/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Ruler Slider" };

export default function RulerSliderPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ruler Slider" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RulerSliderExamples />
      </div>
    </div>
  );
}
