import { PageHeader } from "@/components/page-header";
import { ScrollAreaExamples } from "@/app/(app)/components/scroll-area/examples";

export const metadata = { title: "Scroll Area" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scroll Area" description="Contain long lists and horizontal strips with native scrolling; edge fades signal more content." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScrollAreaExamples />
      </div>
    </div>
  );
}
