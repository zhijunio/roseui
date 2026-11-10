"use client";

import * as React from "react";
import { EmojiPicker } from "@/components/composite/emoji-picker";
import { EmojiReactionButton } from "@/components/composite/emoji-reaction-button";
import { cn } from "@/lib/utils";

export type Reaction = {
  emoji: string;
  label: string;
  count: number;
  selected?: boolean;
};

export type ReactionsProps = {
  reactions: Reaction[];
  onReactionsChange?: (reactions: Reaction[]) => void;
  readOnly?: boolean;
  className?: string;
  label?: string;
};

export function Reactions({
  reactions,
  onReactionsChange,
  readOnly = false,
  className,
  label = "Reactions",
}: ReactionsProps) {
  const [internalReactions, setInternalReactions] = React.useState(reactions);
  const current = onReactionsChange ? reactions : internalReactions;

  function update(next: Reaction[]) {
    if (!onReactionsChange) setInternalReactions(next);
    onReactionsChange?.(next);
  }

  function toggle(emoji: string, selected: boolean) {
    update(
      current.map((reaction) =>
        reaction.emoji === emoji ? { ...reaction, selected } : reaction,
      ),
    );
  }

  function add(emoji: string) {
    const existing = current.find((reaction) => reaction.emoji === emoji);
    if (existing) {
      toggle(emoji, !existing.selected);
      return;
    }
    update([...current, { emoji, label: emoji, count: 0, selected: true }]);
  }

  return (
    <div
      data-slot="reactions"
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {current.map((reaction) => (
        <EmojiReactionButton
          key={reaction.emoji}
          emoji={reaction.emoji}
          label={reaction.label}
          count={reaction.count}
          pressed={Boolean(reaction.selected)}
          onPressedChange={(selected) => toggle(reaction.emoji, selected)}
          readOnly={readOnly}
        />
      ))}
      {!readOnly && (
        <EmojiPicker triggerLabel="Add reaction" onValueChange={add} />
      )}
    </div>
  );
}
