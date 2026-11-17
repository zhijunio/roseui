"use client";

import { useState } from "react";

import { BriefcaseBusiness, Code, Palette } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SearchSelect, type SearchSelectOption } from "@/components/roseui/search-select";

const tools: SearchSelectOption[] = [
  { value: "figma", label: "Figma", group: "Design", icon: <Palette aria-hidden="true" /> },
  { value: "linear", label: "Linear", group: "Planning", icon: <BriefcaseBusiness aria-hidden="true" /> },
  { value: "github", label: "GitHub", group: "Development", icon: <Code aria-hidden="true" /> },
  { value: "storybook", label: "Storybook", group: "Development", icon: <Code aria-hidden="true" /> },
];

export function SearchSelectExamples() {
  const [selectedTools, setSelectedTools] = useState<string[]>(["figma"]);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Grouped options and descriptions" layout="panel">
        <SearchSelect
          aria-label="Primary tool"
          options={tools}
          placeholder="Choose a tool"
          searchPlaceholder="Search tools"
          clearable
        />
      </ComponentPreview>
      <ComponentPreview title="Multiple selection" layout="panel">
        <div className="grid gap-3">
          <SearchSelect
            aria-label="Selected tools"
            options={tools}
            value={selectedTools}
            onValueChange={(next) => setSelectedTools(Array.isArray(next) ? next : [next])}
            multiple
            placeholder="Choose tools"
            searchPlaceholder="Search tools"
            clearable
          />
          <output aria-live="polite" className="text-muted-foreground text-xs">
            {selectedTools.length ? `Selected: ${selectedTools.join(", ")}` : "No tools selected"}
          </output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Custom values and invalid state" layout="panel">
        <div className="grid gap-3">
          <SearchSelect
            aria-label="Tags"
            options={tools}
            allowCustomValue
            autoHighlight
            placeholder="Choose or enter a value"
            searchPlaceholder="Search or type a new value"
          />
          <SearchSelect aria-label="Required option" options={tools} invalid placeholder="Choose a required option" />
        </div>
      </ComponentPreview>
    </div>
  );
}
