import { TextareaExamples } from "@/components/examples/textarea/textarea";

export const metadata = { title: "TextArea" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TextareaExamples />
      </div>
    </div>
  );
}
