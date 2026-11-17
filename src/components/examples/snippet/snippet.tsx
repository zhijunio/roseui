"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Snippet, SnippetTab, SnippetTabPanel, SnippetTabPanels, SnippetTabsList } from "@/components/roseui/snippet";

const commands = [
  { id: "npm", label: "NPM", command: "npm install @radix-ui/react-tabs" },
  { id: "pnpm", label: "PNPM", command: "pnpm add @radix-ui/react-tabs" },
  { id: "yarn", label: "Yarn", command: "yarn add @radix-ui/react-tabs" },
  { id: "bun", label: "Bun", command: "bun add @radix-ui/react-tabs" },
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
            <SnippetTabPanel key={command.id} id={command.id} value={command.id}>
              {command.command}
            </SnippetTabPanel>
          )}
        </SnippetTabPanels>
      </Snippet>
    </ComponentPreview>
  );
}
