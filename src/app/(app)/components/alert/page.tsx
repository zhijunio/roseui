import { AlertExamples } from "@/examples/components/alert/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Alert" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Alert" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AlertExamples />
      </div>
    </div>
  );
}
