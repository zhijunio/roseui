"use client";
import { useState } from "react";

import { TagGroup } from "@/components/ui/tag-group";
import { ComponentPreview } from "@/examples/component-preview";

export function TagGroupExamples() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "US West"]);
  const [priority, setPriority] = useState(["Standard"]);
  const [categories, setCategories] = useState(["Design"]);

  return (
    <>
      <ComponentPreview title="Removable Filters">
        <div className="w-full space-y-3">
          <TagGroup aria-label="Active filters" values={filters} onValuesChange={setFilters} />
          {filters.length === 0 && <p className="text-sm text-muted-foreground">No filters selected.</p>}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Read-only Tags">
        <TagGroup aria-label="Customer segments" values={["Healthcare", "Priority", "Renewal"]} />
      </ComponentPreview>
      <ComponentPreview title="Color Variants">
        <div className="grid w-full gap-4">
          <TagGroup aria-label="Lime tags" values={["Active", "Verified", "Healthy"]} color="lime" />
          <TagGroup aria-label="Rose tags" values={["Past due", "Blocked", "Review"]} color="rose" />
          <TagGroup aria-label="Neutral tags" values={["Draft", "Pending", "Archived"]} color="gray" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Tag Sizes">
        <div className="grid w-full gap-4">
          <TagGroup aria-label="Small cyan tags" values={["New", "Review"]} color="cyan" size="sm" />
          <TagGroup aria-label="Medium cyan tags" values={["New", "Review"]} color="cyan" size="default" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Selection">
        <div className="grid w-full gap-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">Priority</p>
            <TagGroup
              aria-label="Priority"
              selectionMode="single"
              options={["Low", "Standard", "Urgent"]}
              values={priority}
              onValuesChange={setPriority}
              color="cyan"
              size="sm"
            />
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected: {priority[0] ?? "None"}
            </p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">Categories</p>
            <TagGroup
              aria-label="Categories"
              selectionMode="multiple"
              options={["Design", "Engineering", "Research"]}
              values={categories}
              onValuesChange={setCategories}
              color="cyan"
            />
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected: {categories.join(", ") || "None"}
            </p>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <div className="grid w-full gap-3">
          <TagGroup aria-label="Locked filters" values={["Active", "Enterprise"]} onValuesChange={() => {}} disabled />
          <TagGroup
            aria-label="Locked priorities"
            selectionMode="single"
            options={["Low", "Standard", "Urgent"]}
            values={["Standard"]}
            onValuesChange={() => {}}
            disabled
          />
        </div>
      </ComponentPreview>
    </>
  );
}
