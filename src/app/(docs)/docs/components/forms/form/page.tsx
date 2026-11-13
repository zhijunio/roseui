import { FormExamples } from "@/components/examples/form/form";

export const metadata = { title: "Form" };

export default function FormPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <FormExamples />
      </div>
    </div>
  );
}
