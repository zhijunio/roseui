import { PageHeader } from "@/components/page-header";
import { InputExamples } from "@/app/(app)/components/input/examples";

export const metadata = { title: "Input" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input" description="Usage examples for the Input component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputExamples />
      </div>
    </div>
  );
}
