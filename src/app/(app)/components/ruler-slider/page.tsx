import { PageHeader } from "@/components/page-header"
import { RulerSliderExamples } from "@/app/(app)/components/ruler-slider/examples"

export const metadata = { title: "Ruler Slider" }

export default function RulerSliderPage() {
  return <div className="space-y-6"><PageHeader title="Ruler Slider" description="Set a precise value on a measured scale with a fixed reading marker." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><RulerSliderExamples /></div></div>
}
