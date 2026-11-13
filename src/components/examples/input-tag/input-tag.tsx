"use client";

import { useState } from "react";

import type { Selection } from "react-aria-components/TagGroup";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Input } from "@/components/ui/input";
import { InputTag } from "@/components/ui/input-tag";
import { Label } from "@/components/ui/label";

export function InputTagExamples() {
  const [labels, setLabels] = useState<Selection>(new Set(["Renewal", "Needs review"]));

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Tag Suggestions">
        <div className="w-full max-w-lg">
          <InputTag value={labels} onChange={setLabels} name="project-labels">
            <Label className="block w-fit text-sm font-medium">Project labels</Label>
            <Input className="mt-1" placeholder="Add a label, then press Enter" />
          </InputTag>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Required recipients">
        <div className="w-full max-w-lg">
          <InputTag isRequired name="recipients">
            <Label className="block w-fit text-sm font-medium">Recipient addresses</Label>
            <Input className="mt-1" placeholder="Add an email address" />
          </InputTag>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Read-only labels">
        <div className="w-full max-w-lg">
          <InputTag isReadOnly defaultValue={["Billing", "Priority"]}>
            <Label className="block w-fit text-sm font-medium">Applied categories</Label>
            <Input className="mt-1" aria-label="Applied categories" />
          </InputTag>
        </div>
      </ComponentPreview>
    </div>
  );
}
