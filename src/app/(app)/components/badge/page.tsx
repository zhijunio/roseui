import { PageHeader } from "@/components/page-header";
import { BadgeExamples } from "@/app/(app)/components/badge/examples";

export const metadata = { title: "Badge" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Badge" description="Usage examples for the Badge component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BadgeExamples />
      </div>
    </div>
  );
}
