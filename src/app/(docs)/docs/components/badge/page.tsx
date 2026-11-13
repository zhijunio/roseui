import { BadgeExamples } from "@/examples/components/badge/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Badge" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Badge" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BadgeExamples />
      </div>
    </div>
  );
}
