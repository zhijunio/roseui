import { ReactionsExamples } from "@/examples/components/emoji-reaction-button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Reactions" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reactions" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ReactionsExamples />
      </div>
    </div>
  );
}
