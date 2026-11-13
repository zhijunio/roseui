import { InputMentionExamples } from "@/components/examples/input-mention/input-mention";

export const metadata = { title: "Input Mention" };

export default function InputMentionPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputMentionExamples />
      </div>
    </div>
  );
}
