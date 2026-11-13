import { TimelineExamples } from "@/components/examples/timeline/timeline";

export const metadata = { title: "Timeline" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimelineExamples />
      </div>
    </div>
  );
}
