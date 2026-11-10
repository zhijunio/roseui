import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { StatCardExamples } from "./examples";
export const metadata = { title: "Stat Card" };
export default function Page() { return <div className="space-y-6"><PageHeader title="Stat Card" description="Summarize key workspace measures with context and direction." /><ComponentPreview previewId="stat-card-01" title="Workspace overview" layout="fullStack"><StatCardExamples /></ComponentPreview></div>; }
