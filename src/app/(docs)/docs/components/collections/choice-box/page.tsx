import { ChoiceBoxExamples } from "@/components/examples/choice-box/choice-box";

export const metadata = { title: "Choice Box" };

export default function ChoiceBoxPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ChoiceBoxExamples />
    </div>
  );
}
