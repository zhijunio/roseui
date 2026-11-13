import { InputMaskExamples } from "@/examples/components/input-mask/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Input Mask" };

export default function InputMaskPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Mask" />
      <InputMaskExamples />
    </div>
  );
}
