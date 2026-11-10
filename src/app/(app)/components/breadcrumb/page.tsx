import { PageHeader } from "@/components/page-header";
import { BreadcrumbExamples } from "@/app/(app)/components/breadcrumb/examples";

export const metadata = { title: "Breadcrumb" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Breadcrumb" description="Usage examples for the Breadcrumb component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BreadcrumbExamples />
      </div>
    </div>
  );
}
