import { InlineEditExamples } from "@/examples/components/inline-edit/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Inline Edit" };

export default function InlineEditPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inline Edit" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InlineEditExamples />
      </div>
    </div>
  );
}
