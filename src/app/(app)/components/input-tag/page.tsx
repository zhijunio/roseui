import { InputTagExamples } from "@/examples/components/input-tag/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Input Tag" };

export default function InputTagPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Tag" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputTagExamples />
      </div>
    </div>
  );
}
