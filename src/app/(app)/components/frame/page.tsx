import { FrameExamples } from "@/components/examples/components/frame/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Frame" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Frame" description="Usage examples for the Frame component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FrameExamples />
      </div>
    </div>
  );
}
