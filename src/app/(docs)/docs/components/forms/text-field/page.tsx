import { TextFieldExamples } from "@/components/examples/text-field/text-field";

export const metadata = { title: "Text Field" };

export default function TextFieldPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <TextFieldExamples />
    </div>
  );
}
