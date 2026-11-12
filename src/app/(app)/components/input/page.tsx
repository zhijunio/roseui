import { InputExamples } from "@/examples/components/input/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Input" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputExamples />
      </div>
    </div>
  );
}
