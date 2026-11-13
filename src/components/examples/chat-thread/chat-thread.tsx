"use client";

import * as React from "react";

import { type ChatDraft, type ChatMessage, ChatThread } from "@/components/ui/chat-thread";
import { ComponentPreview } from "@/examples/component-preview";

const participants = [
  { id: "mina", name: "Mina Patel", description: "Workspace admin" },
  { id: "riley", name: "Riley Park", description: "Operations lead" },
  { id: "jamie", name: "Jamie Chen", description: "Product manager" },
];

const messages: ChatMessage[] = [
  {
    id: "message-1",
    authorId: "riley",
    text: "The regional usage report is ready. I attached the export for review.",
    createdAt: "2026-11-10T08:40:00.000Z",
    status: "sent",
    attachments: [{ id: "report", name: "regional-usage.csv", size: 184320 }],
    reactions: [{ emoji: "👍", label: "Thumbs up", count: 1 }],
  },
  {
    id: "message-2",
    authorId: "mina",
    text: "Thanks. I will check the Singapore workspace before the customer call.",
    createdAt: "2026-11-10T08:43:00.000Z",
    status: "sent",
    attachments: [],
    reactions: [],
  },
  {
    id: "message-3",
    authorId: "riley",
    text: "A second pass is useful for the permissions column.",
    createdAt: "2026-11-10T08:44:00.000Z",
    status: "sent",
    attachments: [],
    reactions: [],
  },
];

function sendDemoMessage(draft: ChatDraft) {
  return new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (draft.text.toLowerCase().includes("retry")) reject(new Error("Demo delivery failure"));
      else resolve();
    }, 500);
  });
}

function retryDemoMessage(_message: ChatMessage, draft: ChatDraft) {
  return sendDemoMessage(draft);
}

export function ChatThreadExamples() {
  const [currentMessages, setCurrentMessages] = React.useState(messages);

  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Operations handoff" layout="panel" span={2}>
        <div className="w-full max-w-4xl">
          <ChatThread
            participants={participants}
            currentUserId="mina"
            messages={currentMessages}
            onMessagesChange={setCurrentMessages}
            onSend={sendDemoMessage}
            onRetry={retryDemoMessage}
            typingParticipantIds={["riley"]}
            readBy={{ riley: "message-2" }}
            accept=".csv,.pdf,image/*"
            label="Operations handoff conversation"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            To preview recovery, send a message containing &quot;retry&quot;.
          </p>
        </div>
      </ComponentPreview>
    </div>
  );
}
