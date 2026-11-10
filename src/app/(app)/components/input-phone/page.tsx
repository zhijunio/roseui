import { PageHeader } from "@/components/page-header";
import { InputPhoneExamples } from "@/app/(app)/components/input-phone/examples";

export const metadata = { title: "Input Phone" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Phone" description="Usage examples for the Input Phone component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputPhoneExamples />
      </div>
    </div>
  );
}
