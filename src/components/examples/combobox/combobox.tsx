"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  ComboBox,
  ComboBoxContent,
  ComboBoxDescription,
  ComboBoxInput,
  ComboBoxItem,
  ComboBoxLabel,
  ComboBoxSection,
  ComboBoxValue,
} from "@/components/roseui/combo-box";

const teams = [
  { id: "design", name: "Design" },
  { id: "engineering", name: "Engineering" },
  { id: "finance", name: "Finance" },
  { id: "operations", name: "Operations" },
];

const people = [
  { id: "maya", name: "Maya Chen", role: "Design systems" },
  { id: "alex", name: "Alex Rivera", role: "Engineering" },
  { id: "sam", name: "Sam Patel", role: "Engineering" },
  { id: "lee", name: "Lee Morgan", role: "Operations" },
];

const groupedOptions = [
  {
    id: "design",
    title: "Design",
    items: [
      { id: "figma", name: "Figma", detail: "Interface design" },
      { id: "penpot", name: "Penpot", detail: "Open source design" },
    ],
  },
  {
    id: "development",
    title: "Development",
    items: [
      { id: "vscode", name: "Visual Studio Code", detail: "Code editor" },
      { id: "webstorm", name: "WebStorm", detail: "JavaScript IDE" },
    ],
  },
];

const roles = [
  { id: "owner", name: "Owner" },
  { id: "admin", name: "Administrator" },
  { id: "editor", name: "Editor" },
  { id: "viewer", name: "Viewer" },
];

export function ComboBoxExamples() {
  const [inputValue, setInputValue] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<string | number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | number | null>(null);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Default Options">
        <ComboBox aria-label="Choose a team" className="w-full max-w-sm">
          <ComboBoxInput placeholder="Search teams..." />
          <ComboBoxContent items={teams}>
            {(team) => (
              <ComboBoxItem id={team.id} textValue={team.name}>
                {team.name}
              </ComboBoxItem>
            )}
          </ComboBoxContent>
        </ComboBox>
      </ComponentPreview>
      <ComponentPreview title="Searchable Options">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <ComboBox
            aria-label="Search people"
            inputValue={inputValue}
            onInputChange={setInputValue}
            selectedKey={selectedPerson}
            onSelectionChange={setSelectedPerson}
            className="w-full min-w-0 sm:max-w-sm"
          >
            <ComboBoxInput placeholder="Search people..." />
            <ComboBoxContent items={people}>
              {(person) => (
                <ComboBoxItem id={person.id} textValue={person.name}>
                  <ComboBoxLabel>{person.name}</ComboBoxLabel>
                  <ComboBoxDescription>{person.role}</ComboBoxDescription>
                </ComboBoxItem>
              )}
            </ComboBoxContent>
          </ComboBox>
          {selectedPerson && (
            <output className="text-muted-foreground shrink-0 text-sm" aria-live="polite">
              {people.find((person) => person.id === selectedPerson)?.name}
            </output>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Controlled Selection">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <ComboBox
            aria-label="Choose a team"
            selectedKey={selectedTeam}
            onSelectionChange={setSelectedTeam}
            className="w-full min-w-0 sm:max-w-sm"
          >
            <ComboBoxInput placeholder="Select a team" />
            <ComboBoxContent items={teams}>
              {(team) => (
                <ComboBoxItem id={team.id} textValue={team.name}>
                  {team.name}
                </ComboBoxItem>
              )}
            </ComboBoxContent>
          </ComboBox>
          <output className="text-muted-foreground shrink-0 text-sm" aria-live="polite">
            {teams.find((team) => team.id === selectedTeam)?.name ?? "—"}
          </output>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Grouped Options">
        <ComboBox aria-label="Choose a tool" className="w-full max-w-sm">
          <ComboBoxInput placeholder="Search tools" />
          <ComboBoxContent items={groupedOptions}>
            {(group) => (
              <ComboBoxSection title={group.title} items={group.items}>
                {(tool) => (
                  <ComboBoxItem id={tool.id} textValue={tool.name}>
                    <ComboBoxLabel>{tool.name}</ComboBoxLabel>
                    <ComboBoxDescription>{tool.detail}</ComboBoxDescription>
                  </ComboBoxItem>
                )}
              </ComboBoxSection>
            )}
          </ComboBoxContent>
        </ComboBox>
      </ComponentPreview>

      <ComponentPreview title="Multiple Selection">
        <ComboBox aria-label="Choose roles" selectionMode="multiple" className="w-full max-w-sm">
          <ComboBoxInput placeholder="Add roles" />
          <ComboBoxValue<(typeof roles)[number]> className="text-muted-foreground min-h-8 text-sm">
            {({ selectedText }) => selectedText}
          </ComboBoxValue>
          <ComboBoxContent items={roles}>
            {(role) => (
              <ComboBoxItem id={role.id} textValue={role.name}>
                {role.name}
              </ComboBoxItem>
            )}
          </ComboBoxContent>
        </ComboBox>
      </ComponentPreview>

      <ComponentPreview title="Disabled, Read-only, and Invalid">
        <div className="grid w-full gap-3 md:grid-cols-3">
          <ComboBox aria-label="Disabled team" disabled className="w-full min-w-0">
            <ComboBoxInput placeholder="Disabled" />
            <ComboBoxContent items={teams}>
              {(team) => (
                <ComboBoxItem id={team.id} textValue={team.name}>
                  {team.name}
                </ComboBoxItem>
              )}
            </ComboBoxContent>
          </ComboBox>
          <ComboBox aria-label="Read-only team" defaultSelectedKey="design" readOnly className="w-full min-w-0">
            <ComboBoxInput />
            <ComboBoxContent items={teams}>
              {(team) => (
                <ComboBoxItem id={team.id} textValue={team.name}>
                  {team.name}
                </ComboBoxItem>
              )}
            </ComboBoxContent>
          </ComboBox>
          <ComboBox aria-label="Required team" required invalid className="w-full min-w-0">
            <ComboBoxInput placeholder="Choose a team" />
            <ComboBoxContent items={teams}>
              {(team) => (
                <ComboBoxItem id={team.id} textValue={team.name}>
                  {team.name}
                </ComboBoxItem>
              )}
            </ComboBoxContent>
          </ComboBox>
        </div>
      </ComponentPreview>
    </div>
  );
}
