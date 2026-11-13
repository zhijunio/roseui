import { NativeSelectExamples } from "@/examples/components/native-select/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Native Select" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Native Select" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NativeSelectExamples />
      </div>
    </div>
  );
}
