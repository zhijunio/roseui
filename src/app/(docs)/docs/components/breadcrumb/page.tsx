import { BreadcrumbExamples } from "@/examples/components/breadcrumb/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Breadcrumb" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Breadcrumb" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BreadcrumbExamples />
      </div>
    </div>
  );
}
