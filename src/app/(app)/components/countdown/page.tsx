import { CountdownExamples } from "@/components/examples/components/countdown/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Countdown" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Countdown" description="Show time remaining before a workspace deadline or scheduled event." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CountdownExamples />
      </div>
    </div>
  );
}
