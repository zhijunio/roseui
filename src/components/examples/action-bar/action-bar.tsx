"use client";

import { useState } from "react";

import { Archive as IconArchive, Check as IconCheck, Trash as IconTrash } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ActionBar, ActionBarContent, ActionBarPrefix, ActionBarSeparator } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckboxButton, CheckboxField } from "@/components/ui/checkbox";

export function ActionBarExamples() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState<string[]>(["review"]);
  const tasks = [
    { id: "review", title: "Review Q4 launch checklist", owner: "Maya Chen" },
    { id: "report", title: "Prepare customer report", owner: "Noah Williams" },
    { id: "invoice", title: "Confirm vendor invoice", owner: "Ava Patel" },
  ];

  function toggleTask(taskId: string, checked: boolean) {
    setSelectedTasks((selected) => (checked ? [...selected, taskId] : selected.filter((id) => id !== taskId)));
  }

  return (
    <>
      <ComponentPreview title="Visible Actions" layout="panel">
        <div className="relative grid min-h-52 w-full place-items-center pb-16">
          <Button variant="outline" size="sm" onPress={() => setIsOpen((open) => !open)}>
            {isOpen ? "Hide action bar" : "Show action bar"}
          </Button>
          <ActionBar aria-label="Selected item actions" isOpen={isOpen} className="absolute inset-x-0 bottom-0">
            <ActionBarPrefix>
              <Badge variant="secondary">3 selected</Badge>
            </ActionBarPrefix>
            <ActionBarSeparator />
            <ActionBarContent>
              <Button size="sm" variant="ghost">
                <IconCheck aria-hidden="true" />
                Confirm
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                <IconTrash aria-hidden="true" />
                Remove
              </Button>
            </ActionBarContent>
          </ActionBar>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Selection and Bulk Actions" layout="panel">
        <div className="relative w-full max-w-xl space-y-1 pb-16">
          <div className="space-y-1">
            {tasks.map((task) => (
              <CheckboxField
                key={task.id}
                checked={selectedTasks.includes(task.id)}
                onCheckedChange={(checked) => toggleTask(task.id, checked === true)}
                aria-labelledby={`task-${task.id}-label`}
              >
                <CheckboxButton className="w-full items-center gap-3 rounded-lg px-2 py-3 text-sm hover:bg-muted/50">
                  <span id={`task-${task.id}-label`} className="min-w-0 flex-1 truncate font-medium">
                    {task.title}
                  </span>
                  <span className="text-muted-foreground shrink-0 text-xs">{task.owner}</span>
                </CheckboxButton>
              </CheckboxField>
            ))}
          </div>
          <ActionBar
            aria-label="Selected task actions"
            isOpen={selectedTasks.length > 0}
            className="absolute inset-x-0 bottom-0"
          >
            <ActionBarPrefix>
              <Badge variant="secondary">{selectedTasks.length} selected</Badge>
            </ActionBarPrefix>
            <ActionBarSeparator />
            <ActionBarContent>
              <Button size="sm" variant="ghost" onPress={() => setSelectedTasks([])}>
                <IconArchive aria-hidden="true" />
                Archive
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onPress={() => setSelectedTasks([])}
              >
                <IconTrash aria-hidden="true" />
                Delete
              </Button>
            </ActionBarContent>
          </ActionBar>
        </div>
      </ComponentPreview>
    </>
  );
}
