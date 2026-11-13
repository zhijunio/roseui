import { RangeHistogramSliderExamples } from "@/examples/components/range-histogram-slider/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Range Histogram Slider" };

export default function RangeHistogramSliderPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Range Histogram Slider" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RangeHistogramSliderExamples />
      </div>
    </div>
  );
}
