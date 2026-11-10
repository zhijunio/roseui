import { PageHeader } from "@/components/page-header";
import { RatingExamples } from "@/app/(app)/components/rating/examples";

export const metadata = { title: "Rating" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rating" description="Usage examples for the Rating component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RatingExamples />
      </div>
    </div>
  );
}
