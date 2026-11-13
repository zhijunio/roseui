import { NumberStepperExamples } from "@/examples/components/number-stepper/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Number Stepper" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Number Stepper" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NumberStepperExamples />
      </div>
    </div>
  );
}
