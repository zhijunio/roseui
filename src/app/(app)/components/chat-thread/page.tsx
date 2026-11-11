import { ChatThreadExamples } from "@/components/examples/components/chat-thread/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Chat Thread" };

export default function ChatThreadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat Thread"
        description="Compose support conversations with attachments, delivery state, and read context."
      />
      <ChatThreadExamples />
    </div>
  );
}
