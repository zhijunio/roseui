import { InputMoneyExamples } from "@/examples/components/input-money/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Input Money" };

export default function InputMoneyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Money" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputMoneyExamples />
      </div>
    </div>
  );
}
