"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import type { Key, Selection } from "@/components/roseui/tag-group";
import { Tag, TagGroup, TagList } from "@/components/roseui/tag-group";

const tagItems = (values: string[]) => values.map((name) => ({ id: name, name }));

function keysFromSelection(selection: Selection) {
  return selection === "all" ? [] : [...selection].map(String);
}

export function TagGroupExamples() {
  const [filters, setFilters] = useState(["Active", "Enterprise", "US West"]);
  const [priority, setPriority] = useState<Selection>(new Set(["Standard"]));
  const [categories, setCategories] = useState<Selection>(new Set(["Design"]));

  function removeFilter(keys: Set<Key>) {
    setFilters((current) => current.filter((filter) => !keys.has(filter)));
  }

  return (
    <>
      <ComponentPreview title="Removable Filters">
        <div className="w-full space-y-3">
          <TagGroup aria-label="Active filters" onRemove={removeFilter}>
            <TagList items={tagItems(filters)}>{(item) => <Tag id={item.id}>{item.name}</Tag>}</TagList>
          </TagGroup>
          {filters.length === 0 && <p className="text-sm text-muted-foreground">No filters selected.</p>}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Read-only Tags">
        <TagGroup aria-label="Customer segments">
          <TagList items={tagItems(["Healthcare", "Priority", "Renewal"])}>
            {(item) => <Tag id={item.id}>{item.name}</Tag>}
          </TagList>
        </TagGroup>
      </ComponentPreview>
      <ComponentPreview title="Color Variants">
        <TagGroup aria-label="Project status">
          <TagList items={tagItems(["Active", "Past due", "Draft"])}>
            {(item) => (
              <Tag
                id={item.id}
                className={
                  item.name === "Active"
                    ? "border-success/30 bg-success/10 text-success"
                    : item.name === "Past due"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : "border-border bg-muted text-muted-foreground"
                }
              >
                {item.name}
              </Tag>
            )}
          </TagList>
        </TagGroup>
      </ComponentPreview>
      <ComponentPreview title="Selection" layout="panel">
        <div className="grid w-full gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <p className="text-sm font-medium">Priority</p>
            <TagGroup
              aria-label="Priority"
              selectionMode="single"
              selectedKeys={priority}
              onSelectionChange={setPriority}
            >
              <TagList items={tagItems(["Low", "Standard", "Urgent"])}>
                {(item) => <Tag id={item.id}>{item.name}</Tag>}
              </TagList>
            </TagGroup>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected: {keysFromSelection(priority)[0] ?? "None"}
            </p>
          </div>
          <div className="grid gap-2">
            <p className="text-sm font-medium">Categories</p>
            <TagGroup
              aria-label="Categories"
              selectionMode="multiple"
              selectedKeys={categories}
              onSelectionChange={setCategories}
            >
              <TagList items={tagItems(["Design", "Engineering", "Research"])}>
                {(item) => <Tag id={item.id}>{item.name}</Tag>}
              </TagList>
            </TagGroup>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected: {keysFromSelection(categories).join(", ") || "None"}
            </p>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
