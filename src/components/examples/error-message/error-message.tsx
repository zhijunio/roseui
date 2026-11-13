"use client";

import * as React from "react";

import type { Selection } from "react-aria-components/TagGroup";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import { Tag, TagGroup, TagList } from "@/components/ui/tag-group";

const categories = ["News", "Travel", "Gaming", "Shopping"];

function RequiredCategoriesExample() {
  const [values, setValues] = React.useState<Selection>(new Set());
  const errorId = React.useId();
  const selectedValues = values === "all" ? [] : [...values].map(String);
  const hasError = selectedValues.length === 0;

  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="grid gap-1.5">
        <p className="text-sm font-medium">Required categories</p>
        <p className="text-sm text-muted-foreground">Choose at least one category to personalize your feed.</p>
      </div>
      <TagGroup
        aria-label="Categories"
        aria-describedby={hasError ? errorId : undefined}
        selectionMode="multiple"
        selectedKeys={values}
        onSelectionChange={setValues}
      >
        <TagList items={categories.map((name) => ({ id: name, name }))}>
          {(category) => <Tag id={category.id}>{category.name}</Tag>}
        </TagList>
      </TagGroup>
      {hasError ? <ErrorMessage id={errorId}>Select at least one category.</ErrorMessage> : null}
      <div className="flex items-center gap-3">
        <Button size="sm" onPress={() => setValues(selectedValues.length ? new Set() : new Set(["News"]))}>
          {hasError ? "Select News" : "Clear selection"}
        </Button>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {selectedValues.length ? `${selectedValues.length} selected` : "No categories selected"}
        </span>
      </div>
    </div>
  );
}

function RequiredProjectExample() {
  const [project, setProject] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const errorId = React.useId();
  const hasError = submitted && project === null;

  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="grid gap-1.5">
        <p className="text-sm font-medium">Project to archive</p>
        <p className="text-sm text-muted-foreground">Choose a project before continuing.</p>
      </div>
      <ListBox
        aria-label="Project to archive"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        selectionMode="single"
        selectedKeys={project ? new Set([project]) : new Set()}
        onSelectionChange={(selection) => {
          setProject(selection === "all" ? null : ((selection.values().next().value as string | undefined) ?? null));
        }}
      >
        <ListBoxItem id="website">Website refresh</ListBoxItem>
        <ListBoxItem id="mobile">Mobile app</ListBoxItem>
        <ListBoxItem id="design-system">Design system</ListBoxItem>
      </ListBox>
      {hasError && <ErrorMessage id={errorId}>Select a project to continue.</ErrorMessage>}
      <div className="flex items-center gap-3">
        <Button size="sm" onPress={() => setSubmitted(true)}>
          Continue
        </Button>
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {project ? `Selected: ${project}` : "No project selected"}
        </span>
      </div>
    </div>
  );
}

export function ErrorMessageExamples() {
  return (
    <>
      <ComponentPreview title="Required selection" layout="stack">
        <RequiredCategoriesExample />
      </ComponentPreview>
      <ComponentPreview title="Required list selection" layout="stack">
        <RequiredProjectExample />
      </ComponentPreview>
    </>
  );
}
