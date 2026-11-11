import { CloseButtonExamples } from "@/components/examples/components/close-button/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Close Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Close Button" description="Usage examples for the Close Button component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CloseButtonExamples />
      </div>
    </div>
  );
}
