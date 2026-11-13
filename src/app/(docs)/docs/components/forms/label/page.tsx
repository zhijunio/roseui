import { LabelExamples } from "@/components/examples/label/label";

export const metadata = { title: "Label" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LabelExamples />
      </div>
    </div>
  );
}
