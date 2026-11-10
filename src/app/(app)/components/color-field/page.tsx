import { PageHeader } from "@/components/page-header";
import { ColorFieldExamples } from "@/app/(app)/components/color-field/examples";

export const metadata = { title: "Color Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Field" description="Usage examples for the Color Field component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorFieldExamples />
      </div>
    </div>
  );
}
