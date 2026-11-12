import { QuestionnaireExamples } from "@/examples/components/questionnaire/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Questionnaire" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Questionnaire" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <QuestionnaireExamples />
      </div>
    </div>
  );
}
