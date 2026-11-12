import { RatingExamples } from "@/examples/components/rating/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Rating" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Rating" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <RatingExamples />
      </div>
    </div>
  );
}
