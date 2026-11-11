import { AlertExamples } from "@/components/examples/components/alert/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Alert" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Alert" description="Usage examples for the Alert component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AlertExamples />
      </div>
    </div>
  );
}
