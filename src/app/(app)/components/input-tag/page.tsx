import { PageHeader } from "@/components/page-header";
import { InputTagExamples } from "@/app/(app)/components/input-tag/examples";

export const metadata = { title: "Input Tag" };

export default function InputTagPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Tag" description="Build a list of editable labels from short text values." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputTagExamples />
      </div>
    </div>
  );
}
