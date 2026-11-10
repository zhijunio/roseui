import { PageHeader } from "@/components/page-header";
import { CardExamples } from "@/app/(app)/components/card/examples";

export const metadata = { title: "Card" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Card" description="Usage examples for the Card component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CardExamples />
      </div>
    </div>
  );
}
