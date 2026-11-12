import { ChatThreadExamples } from "@/examples/components/chat-thread/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Chat Thread" };

export default function ChatThreadPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Chat Thread" />
      <ChatThreadExamples />
    </div>
  );
}
