import { PageHeader } from "@/components/page-header"
import { ElasticSliderExamples } from "@/app/(app)/components/elastic-slider/examples"

export const metadata = { title: "Elastic Slider" }

export default function ElasticSliderPage() {
  return <div className="space-y-6"><PageHeader title="Elastic Slider" description="Adjust continuous values with a tactile thumb response and optional reference stops." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><ElasticSliderExamples /></div></div>
}
