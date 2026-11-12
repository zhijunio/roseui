import { ButtonExamples } from "@/examples/components/button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Button" description="Usage examples for the Button component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ButtonExamples />
      </div>
    </div>
  );
}
