import { RangeHistogramSliderExamples } from "@/components/examples/range-histogram-slider/range-histogram-slider";

export const metadata = { title: "Range Histogram Slider" };

export default function RangeHistogramSliderPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RangeHistogramSliderExamples />
      </div>
    </div>
  );
}
