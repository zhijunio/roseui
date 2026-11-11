import { InputMentionExamples } from "@/components/examples/components/input-mention/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Input Mention" };

export default function InputMentionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Mention" description="Add structured people and workspace references to a message." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputMentionExamples />
      </div>
    </div>
  );
}
