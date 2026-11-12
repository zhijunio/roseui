import { InputPhoneExamples } from "@/examples/components/input-phone/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Input Phone" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Phone" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputPhoneExamples />
      </div>
    </div>
  );
}
