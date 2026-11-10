import { PageHeader } from "@/components/page-header";
import { InputMoneyExamples } from "@/app/(app)/components/input-money/examples";

export const metadata = { title: "Input Money" };

export default function InputMoneyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Money" description="Enter an amount with currency formatting and minor-unit values." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputMoneyExamples />
      </div>
    </div>
  );
}
