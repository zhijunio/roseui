"use client";

import { useState } from "react";

import { ChevronDown as IconChevronDown, Ellipsis as IconDots } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ShowMore } from "@/components/ui/show-more";

export function ShowMoreExamples() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ComponentPreview title="Horizontal Divider">
        <div className="w-full max-w-lg">
          <p className="text-muted-foreground text-sm">Recent activity</p>
          <ShowMore aria-label="Show more activity">
            <IconDots aria-hidden="true" />
          </ShowMore>
          <p className="text-muted-foreground text-sm">Older activity</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Vertical Divider" layout="panel">
        <div className="flex min-h-32 items-stretch gap-3">
          <span className="text-sm">Summary</span>
          <ShowMore orientation="vertical" as="text" text="More details" />
          <span className="text-sm">Details</span>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Controlled Toggle">
        <ShowMore isSelected={isExpanded} onChange={setIsExpanded} aria-label="Toggle details">
          {isExpanded ? "Show less" : "Show more"}
          <IconChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </ShowMore>
      </ComponentPreview>
      <ComponentPreview title="Text Divider">
        <div className="w-full max-w-lg">
          <p className="text-sm">Continue with your account</p>
          <ShowMore as="text" text="or" />
          <p className="text-sm">Use another sign-in method</p>
        </div>
      </ComponentPreview>
    </>
  );
}
