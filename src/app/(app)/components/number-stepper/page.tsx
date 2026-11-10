import { PageHeader } from "@/components/page-header";
import { NumberStepperExamples } from "@/app/(app)/components/number-stepper/examples";

export const metadata = { title: "Number Stepper" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Number Stepper" description="Usage examples for the Number Stepper component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NumberStepperExamples />
      </div>
    </div>
  );
}
