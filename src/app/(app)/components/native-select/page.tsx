import { NativeSelectExamples } from "@/components/examples/components/native-select/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Native Select" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Native Select" description="Usage examples for the Native Select component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NativeSelectExamples />
      </div>
    </div>
  );
}
