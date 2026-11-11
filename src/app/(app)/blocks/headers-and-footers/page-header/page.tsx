import { PageHeaderExamples } from "@/components/examples/blocks/headers-and-footers/page-header/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Page Header" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Page Header"
        description="A project header that folds into a compact bar as you scroll, with tabs, progress, and actions."
      />
      <PageHeaderExamples />
    </div>
  );
}
