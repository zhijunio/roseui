import { PageHeader } from "@/components/page-header"
import { RangeHistogramSliderExamples } from "@/app/(app)/components/range-histogram-slider/examples"

export const metadata = { title: "Range Histogram Slider" }

export default function RangeHistogramSliderPage() {
  return <div className="space-y-6"><PageHeader title="Range Histogram Slider" description="Filter numeric records while seeing where the values are concentrated." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><RangeHistogramSliderExamples /></div></div>
}
