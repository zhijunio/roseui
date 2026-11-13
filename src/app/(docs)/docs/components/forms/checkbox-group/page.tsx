import { CheckboxGroupExamples } from "@/components/examples/checkbox-group/checkbox-group";

export const metadata = { title: "Checkbox Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CheckboxGroupExamples />
      </div>
    </div>
  );
}
