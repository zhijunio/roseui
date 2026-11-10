import { ComponentPreview } from "@/components/composite/component-preview";
import { RaceBarChart } from "@/components/ui/race-bar-chart";
export function RaceBarChartExample() { return <ComponentPreview previewId="race-bar-chart-01" title="Race Bar Chart" layout="fullStack" span={2} density="chart" className="[&>[data-slot=card-header]]:hidden"><RaceBarChart /></ComponentPreview>; }
