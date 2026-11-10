import { PageHeader } from "@/components/page-header";
import { QuestionnaireExamples } from "@/app/(app)/components/questionnaire/examples";

export const metadata = { title: "Questionnaire" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Questionnaire" description="Usage examples for the Questionnaire component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <QuestionnaireExamples />
      </div>
    </div>
  );
}
