import { SpinnerExamples } from "@/examples/components/spinner/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Spinner" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Spinner" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SpinnerExamples />
      </div>
    </div>
  );
}
