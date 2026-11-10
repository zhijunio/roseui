import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { SunburstExample } from "@/app/(app)/components/sunburst-chart/examples";
export const metadata = { title: "Sunburst Chart" };
export default function SunburstChartExamplePage() { return <div className="space-y-6"><PageHeader title="Sunburst Chart" description="Explore hierarchical spend by team, service, and workload." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><ComponentPreview previewId="sunburst-chart-01" title="Sunburst" layout="fullStack" span={2} density="chart" className="[&>[data-slot=card-header]]:hidden"><SunburstExample /></ComponentPreview></div></div>; }
