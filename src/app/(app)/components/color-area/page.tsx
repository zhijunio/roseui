import { PageHeader } from "@/components/page-header";
import { ColorAreaExamples } from "@/app/(app)/components/color-area/examples";

export const metadata = { title: "Color Area" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Area" description="Usage examples for the Color Area component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorAreaExamples />
      </div>
    </div>
  );
}
