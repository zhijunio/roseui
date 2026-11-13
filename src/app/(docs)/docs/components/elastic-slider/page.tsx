import { ElasticSliderExamples } from "@/examples/components/elastic-slider/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Elastic Slider" };

export default function ElasticSliderPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Elastic Slider" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ElasticSliderExamples />
      </div>
    </div>
  );
}
