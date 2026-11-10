import { PageHeader } from "@/components/page-header";
import { MessageExamples } from "@/app/(app)/components/message/examples";

export const metadata = { title: "Message" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Message" description="Usage examples for the Message component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MessageExamples />
      </div>
    </div>
  );
}
