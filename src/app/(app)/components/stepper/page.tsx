import { PageHeader } from "@/components/page-header";
import { StepperExamples } from "@/app/(app)/components/stepper/examples";

export const metadata = { title: "Stepper" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stepper" description="Usage examples for the Stepper component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <StepperExamples />
      </div>
    </div>
  );
}
