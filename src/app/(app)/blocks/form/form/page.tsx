import { PageHeader } from "@/components/page-header";
import { FormExamples } from "@/app/(app)/blocks/form/form/examples";

export const metadata = { title: "Form" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Form" description="Usage examples for the Form component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FormExamples />
      </div>
    </div>
  );
}
