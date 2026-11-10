import { PageHeader } from "@/components/page-header";
import { ReactionsExamples } from "@/app/(app)/components/emoji-reaction-button/examples";

export const metadata = { title: "Reactions" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reactions" description="A compact reaction group for messages, comments, and shared updates." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ReactionsExamples />
      </div>
    </div>
  );
}
