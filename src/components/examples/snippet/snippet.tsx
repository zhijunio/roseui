"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Snippet, SnippetTab, SnippetTabPanel, SnippetTabPanels, SnippetTabsList } from "@/components/ui/snippet";

const commands = [
  { id: "npm", label: "NPM", command: "npm install react-aria-components" },
  { id: "pnpm", label: "PNPM", command: "pnpm add react-aria-components" },
  { id: "yarn", label: "Yarn", command: "yarn add react-aria-components" },
  { id: "bun", label: "Bun", command: "bun add react-aria-components" },
];

export function SnippetExamples() {
  return (
    <ComponentPreview title="Package managers" layout="panel">
      <Snippet>
        <SnippetTabsList items={commands} aria-label="Package manager">
          {(command) => (
            <SnippetTab key={command.id} value={command.id}>
              {command.label}
            </SnippetTab>
          )}
        </SnippetTabsList>
        <SnippetTabPanels items={commands}>
          {(command) => (
            <SnippetTabPanel key={command.id} id={command.id}>
              {command.command}
            </SnippetTabPanel>
          )}
        </SnippetTabPanels>
      </Snippet>
    </ComponentPreview>
  );
}
