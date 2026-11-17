"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { type Reaction, Reactions } from "@/components/roseui/reactions";

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
      <ComponentPreview title="Selectable Reactions" exampleLabels={["Toggle", "Add reaction"]}>
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
