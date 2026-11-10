"use client";

import { useState } from "react";
import { IconArchive, IconCheck, IconTrash } from "@tabler/icons-react";

import { ActionBar, ActionBarContent, ActionBarPrefix, ActionBarSeparator } from "@/components/composite/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentPreview } from "@/components/composite/component-preview";

export function ActionBarExamples() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(["review"]);
  const tasks = [
    { id: "review", title: "Review Q4 launch checklist", owner: "Maya Chen" },
    { id: "report", title: "Prepare customer report", owner: "Noah Williams" },
    { id: "invoice", title: "Confirm vendor invoice", owner: "Ava Patel" },
  ];

  function toggleTask(taskId: string, checked: boolean) {
    setSelectedTasks((selected) =>
      checked ? [...selected, taskId] : selected.filter((id) => id !== taskId),
    );
  }

  return (
    <>
      <ComponentPreview previewId="action-bar-01" title="Visible Actions" exampleLabels={["Selection count", "Confirm action", "Remove action"]} layout="panel">
        <div className="grid min-h-36 place-items-center">
          <Button variant="outline" size="sm" onClick={() => setIsOpen((open) => !open)}>{isOpen ? "Hide action bar" : "Show action bar"}</Button>
          <ActionBar aria-label="Selected item actions" isOpen={isOpen}>
            <ActionBarPrefix><Badge variant="secondary">3 selected</Badge></ActionBarPrefix>
            <ActionBarSeparator />
            <ActionBarContent>
              <Button size="sm" variant="ghost"><IconCheck aria-hidden="true" />Confirm</Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><IconTrash aria-hidden="true" />Remove</Button>
            </ActionBarContent>
          </ActionBar>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="action-bar-02" title="Bulk Actions on Selected Tasks" layout="panel">
        <div className="w-full max-w-xl space-y-1">
          {tasks.map((task) => (
            <label key={task.id} className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-muted/50">
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onCheckedChange={(checked) => toggleTask(task.id, checked === true)}
                aria-label={`Select ${task.title}`}
              />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{task.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{task.owner}</span>
            </label>
          ))}
        </div>
        <ActionBar aria-label="Selected task actions" isOpen={selectedTasks.length > 0}>
          <ActionBarPrefix><Badge variant="secondary">{selectedTasks.length} selected</Badge></ActionBarPrefix>
          <ActionBarSeparator />
          <ActionBarContent>
            <Button size="sm" variant="ghost" onClick={() => setSelectedTasks([])}><IconArchive aria-hidden="true" />Archive</Button>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setSelectedTasks([])}><IconTrash aria-hidden="true" />Delete</Button>
          </ActionBarContent>
        </ActionBar>
      </ComponentPreview>
    </>
  );
}
