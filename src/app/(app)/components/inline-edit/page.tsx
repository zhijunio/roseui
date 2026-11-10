import { PageHeader } from "@/components/page-header";
import { InlineEditExamples } from "@/app/(app)/components/inline-edit/examples";

export const metadata = { title: "Inline Edit" };

export default function InlineEditPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inline Edit" description="Edit a frequently viewed value in place and keep the surrounding page context." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InlineEditExamples />
      </div>
    </div>
  );
}
