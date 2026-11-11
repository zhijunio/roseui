import { SpinnerExamples } from "@/components/examples/components/spinner/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Spinner" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Spinner" description="Usage examples for the Spinner component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SpinnerExamples />
      </div>
    </div>
  );
}
