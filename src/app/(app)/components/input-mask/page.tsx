import { InputMaskExamples } from "@/components/examples/components/input-mask/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Input Mask" };

export default function InputMaskPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Mask" description="Guide structured input while preserving familiar text fields." />
      <InputMaskExamples />
    </div>
  );
}
