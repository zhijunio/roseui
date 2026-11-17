"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { EmojiReactionButton } from "@/components/roseui/emoji-reaction-button";

export function EmojiReactionButtonExamples() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Controlled selection" layout="panel">
        <div className="grid justify-items-start gap-3">
          <EmojiReactionButton emoji="🎉" label="Celebrate" count={12} pressed={pressed} onPressedChange={setPressed} />
          <output aria-live="polite" className="text-muted-foreground text-xs">
            {pressed ? "Reaction selected" : "Reaction not selected"}
          </output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Sizes and read-only state" layout="panel">
        <div className="flex flex-wrap items-center gap-2">
          <EmojiReactionButton emoji="❤️" label="Love" count={21} size="sm" />
          <EmojiReactionButton emoji="👍" label="Like" count={8} size="md" defaultPressed />
          <EmojiReactionButton emoji="😂" label="Laugh" count={4} size="lg" readOnly />
        </div>
      </ComponentPreview>
    </div>
  );
}
