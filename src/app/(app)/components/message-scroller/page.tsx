import { MessageScrollerExamples } from "@/examples/components/message-scroller/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Message Scroller" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Message Scroller" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MessageScrollerExamples />
      </div>
    </div>
  );
}
