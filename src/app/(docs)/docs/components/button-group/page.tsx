import { ButtonGroupExamples } from "@/examples/components/button-group/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Button Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Button Group" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ButtonGroupExamples />
      </div>
    </div>
  );
}
