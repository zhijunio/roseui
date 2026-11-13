"use client";

import { useState } from "react";

import { CircleX as IconCircleX } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";

type ExampleSection = {
  title: string;
  examples: number[];
};

const sections: ExampleSection[] = [
  {
    title: "Appearance",
    examples: [1, 2],
  },
  {
    title: "States",
    examples: [3, 4],
  },
];

export function CloseButtonExamples() {
  return (
    <>
      {sections.map((section) => {
        return (
          <ComponentPreview key={section.title} title={section.title} layout="grid2">
            {section.examples.map((example) => (
              <CloseButtonExample key={example} example={example} />
            ))}
          </ComponentPreview>
        );
      })}
    </>
  );
}

export function CloseButtonExample({ example }: { example: number }) {
  const [visible, setVisible] = useState(true);

  if (example === 1) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {(["xs", "sm", "default"] as const).map((size) => (
          <span key={size} className="flex items-center">
            <CloseButton size={size} aria-label={"Close, " + size + " size"} />
          </span>
        ))}
      </div>
    );
  }

  if (example === 2) {
    return (
      <CloseButton aria-label="Dismiss update" className="text-primary">
        <IconCircleX aria-hidden />
      </CloseButton>
    );
  }

  if (example === 3 && visible) {
    return (
      <div className="flex w-full items-start justify-between gap-3 rounded-lg border bg-card p-3">
        <div>
          <p className="text-sm font-medium">Draft saved</p>
          <p className="text-sm text-muted-foreground">Your changes are ready to publish.</p>
        </div>
        <CloseButton aria-label="Dismiss saved draft notice" onClick={() => setVisible(false)} />
      </div>
    );
  }

  if (example === 3) {
    return (
      <div className="flex items-center gap-3">
        <p role="status" className="text-sm text-muted-foreground">
          Notice dismissed.
        </p>
        <Button variant="outline" size="sm" onPress={() => setVisible(true)}>
          Restore
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Unavailable item</span>
      <CloseButton disabled aria-label="Close unavailable item" />
    </div>
  );
}
