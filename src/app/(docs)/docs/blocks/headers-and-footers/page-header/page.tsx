import { PageHeaderExamples } from "@/examples/blocks/headers-and-footers/page-header/page-header";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Page Header" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Page Header" />
      <PageHeaderExamples />
    </div>
  );
}
