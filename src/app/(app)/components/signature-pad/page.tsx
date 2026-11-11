import { SignaturePadExamples } from "@/components/examples/components/signature-pad/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Signature Pad" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Signature Pad" description="Usage examples for the Signature Pad component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SignaturePadExamples />
      </div>
    </div>
  );
}
