import { PageHeader } from "@/components/page-header";
import { ButtonGroupExamples } from "@/app/(app)/components/button-group/examples";

export const metadata = { title: "Button Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Button Group" description="Usage examples for the Button Group component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ButtonGroupExamples />
      </div>
    </div>
  );
}
