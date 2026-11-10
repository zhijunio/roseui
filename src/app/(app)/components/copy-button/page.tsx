import { CopyButtonExamples } from "@/app/(app)/components/copy-button/examples";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Copy Button" };

export default function CopyButtonPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Copy Button" description="Copy workspace values with clear success feedback and accessible labels." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CopyButtonExamples />
      </div>
    </div>
  );
}
