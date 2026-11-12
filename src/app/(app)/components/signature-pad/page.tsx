import { SignaturePadExamples } from "@/examples/components/signature-pad/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Signature Pad" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Signature Pad" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SignaturePadExamples />
      </div>
    </div>
  );
}
