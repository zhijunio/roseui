import { RealtimeStreamExamples } from "@/components/examples/components/realtime-stream-chart/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Realtime stream" };

export default function RealtimeStreamExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Realtime stream"
        description="A live line that scrolls at 60fps as readings arrive, holds still on hover to read, and pops a marker on every anomaly."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RealtimeStreamExamples />
      </div>
    </div>
  );
}
