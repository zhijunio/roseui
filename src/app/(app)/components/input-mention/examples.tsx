"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { InputMention, type MentionValue } from "@/components/composite/input-mention";

const people = [
  { id: "member-ava", name: "Ava Chen", description: "Account manager" },
  { id: "member-noah", name: "Noah Patel", description: "Support lead" },
  { id: "member-mia", name: "Mia Torres", description: "Workspace admin" },
];

const channels = [
  { id: "channel-billing", name: "Billing", description: "Invoices and payments" },
  { id: "channel-launch", name: "Launch Planning", description: "Release coordination" },
];

const reviewText = "Please review the renewal summary with @Ava Chen before it goes to #Billing.";

function InputMentionExamplesContent() {
  const [value, setValue] = React.useState<MentionValue>({
    text: reviewText,
    mentions: [
      { kind: "person", id: "member-ava", label: "Ava Chen", start: reviewText.indexOf("@Ava Chen"), end: reviewText.indexOf("@Ava Chen") + "@Ava Chen".length },
      { kind: "channel", id: "channel-billing", label: "Billing", start: reviewText.indexOf("#Billing"), end: reviewText.indexOf("#Billing") + "#Billing".length },
    ],
  });
  const [reply, setReply] = React.useState<MentionValue>({ text: "", mentions: [] });

  return (
    <>
      <ComponentPreview previewId="input-mention-01" title="Review handoff" span={2} layout="panel">
        <div className="grid w-full max-w-2xl gap-4">
          <InputMention
            label="Update"
            value={value}
            onChange={setValue}
            people={people}
            channels={channels}
            description="Type @ to find a teammate or # to reference a workspace channel."
            placeholder="Write an update for the team"
          />
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Structured references</p>
            {value.mentions.length > 0 ? (
              <ul className="grid gap-1 text-xs">
                {value.mentions.map((mention) => (
                  <li key={`${mention.kind}-${mention.id}-${mention.start}`}>
                    {mention.kind}: {mention.label} · {mention.start}–{mention.end}
                  </li>
                ))}
              </ul>
            ) : <p className="text-xs text-muted-foreground">No references added yet.</p>}
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="input-mention-02" title="Reply composer">
        <div className="w-full max-w-lg">
          <InputMention
            label="Reply"
            value={reply}
            onChange={setReply}
            people={people}
            placeholder="Reply to the account team"
            description="Suggestions appear when you type @."
            minRows={2}
            maxRows={5}
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export function InputMentionExamples() {
  return <InputMentionExamplesContent />;
}
