"use client";

import * as React from "react";

import { type Reaction, Reactions } from "@/components/ui/reactions";
import { ComponentPreview } from "@/examples/component-preview";

const initialReactions: Reaction[] = [
  { emoji: "❤️", label: "Love", count: 11, selected: true },
  { emoji: "🎉", label: "Celebrate", count: 4 },
  { emoji: "👍", label: "Like", count: 8 },
  { emoji: "😂", label: "Laugh", count: 3 },
];

function InteractiveReactions() {
  const [reactions, setReactions] = React.useState(initialReactions);
  return (
    <div className="grid justify-items-center gap-3">
      <Reactions reactions={reactions} onReactionsChange={setReactions} />
      <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {reactions.length} reaction types
      </p>
    </div>
  );
}

export function ReactionsExamples() {
  return (
    <>
      <ComponentPreview title="Message reactions" exampleLabels={["Toggle", "Add reaction"]}>
        <InteractiveReactions />
      </ComponentPreview>
      <ComponentPreview title="Read-only summary" exampleLabels={["Non-interactive"]}>
        <Reactions reactions={initialReactions} readOnly />
      </ComponentPreview>
      <ComponentPreview title="Compact reaction group" exampleLabels={["Inline use"]}>
        <Reactions reactions={initialReactions.slice(0, 2)} label="Comment reactions" className="justify-center" />
      </ComponentPreview>
    </>
  );
}
