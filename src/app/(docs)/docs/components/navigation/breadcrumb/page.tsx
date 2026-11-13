import { BreadcrumbExamples } from "@/components/examples/breadcrumb/breadcrumb";

export const metadata = { title: "Breadcrumbs" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <BreadcrumbExamples />
      </div>
    </div>
  );
}
