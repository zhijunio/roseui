"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ReactionButton } from "@/components/roseui/reaction-button";

export function ReactionButtonExamples() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Controlled pressed state" layout="panel">
        <div className="grid justify-items-start gap-3">
          <ReactionButton icon="like" label="Like" count={24} pressed={liked} onPressedChange={setLiked} />
          <output aria-live="polite" className="text-muted-foreground text-xs">
            {liked ? "Selected" : "Not selected"}
          </output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Icon, label, and count" layout="panel">
        <div className="flex flex-wrap gap-2">
          <ReactionButton icon="star" label="Helpful" count={8} defaultPressed />
          <ReactionButton label="Celebrate" count={3} icon={<span aria-hidden="true">🎉</span>} />
          <ReactionButton label="Disabled" count={0} disabled />
        </div>
      </ComponentPreview>
    </div>
  );
}
