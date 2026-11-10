"use client"

import { useState } from "react"
import { IconStar } from "@tabler/icons-react"
import { ListLayout, Virtualizer, type Selection } from "react-aria-components"

import { ComponentPreview } from "@/components/composite/component-preview"
import {
  ListBox,
  ListBoxHeader,
  ListBoxItem,
  ListBoxSection,
} from "@/components/ui/list-box"

const projects = [
  { id: "website", label: "Website refresh" },
  { id: "mobile", label: "Mobile app" },
  { id: "design-system", label: "Design system" },
]

const teams = [
  { id: "design", label: "Design" },
  { id: "engineering", label: "Engineering" },
  { id: "product", label: "Product" },
  { id: "support", label: "Customer support" },
]

const resources = Array.from({ length: 120 }, (_, index) => ({
  id: `resource-${index + 1}`,
  label: `Resource ${String(index + 1).padStart(3, "0")}`,
}))
const resourceListLayout = new ListLayout({ rowHeight: 36 })

function getSelectedLabels(selection: Selection, options: typeof teams) {
  if (selection === "all") return options.map((option) => option.label)
  return options.filter((option) => selection.has(option.id)).map((option) => option.label)
}

export function ListBoxExamples() {
  const [selectedProjectKeys, setSelectedProjectKeys] = useState<Selection>(new Set(["website"]))
  const [selectedTeamKeys, setSelectedTeamKeys] = useState<Selection>(new Set(["design"]))

  const selectedProject = getSelectedLabels(selectedProjectKeys, projects)
  const selectedTeams = getSelectedLabels(selectedTeamKeys, teams)

  return (
    <>
      <ComponentPreview previewId="list-box-01" title="Single Selection">
        <ListBox aria-label="Choose a project" selectionMode="single" defaultSelectedKeys={new Set(["website"])}>
          {projects.map((project) => (
            <ListBoxItem key={project.id} id={project.id} textValue={project.label}>
              {project.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-02" title="Disabled Items">
        <ListBox aria-label="Workspace actions" selectionMode="single">
          <ListBoxItem id="rename">Rename workspace</ListBoxItem>
          <ListBoxItem id="duplicate">Duplicate workspace</ListBoxItem>
          <ListBoxItem id="billing" isDisabled>
            Manage billing
          </ListBoxItem>
          <ListBoxItem id="delete" variant="danger">
            Delete workspace
          </ListBoxItem>
        </ListBox>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-03" title="Sections">
        <ListBox aria-label="Choose a team" selectionMode="single">
          <ListBoxSection id="product-teams">
            <ListBoxHeader>Product</ListBoxHeader>
            <ListBoxItem id="design">Design</ListBoxItem>
            <ListBoxItem id="engineering">Engineering</ListBoxItem>
          </ListBoxSection>
          <ListBoxSection id="business-teams">
            <ListBoxHeader>Business</ListBoxHeader>
            <ListBoxItem id="sales">Sales</ListBoxItem>
            <ListBoxItem id="support">Customer support</ListBoxItem>
          </ListBoxSection>
        </ListBox>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-04" title="Multiple Selection">
        <div className="grid gap-3">
          <ListBox
            aria-label="Choose teams"
            selectionMode="multiple"
            selectedKeys={selectedTeamKeys}
            onSelectionChange={setSelectedTeamKeys}
          >
            {teams.map((team) => (
              <ListBoxItem key={team.id} id={team.id} textValue={team.label}>
                {team.label}
              </ListBoxItem>
            ))}
          </ListBox>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            Selected: {selectedTeams.length ? selectedTeams.join(", ") : "None"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-05" title="Controlled Selection">
        <div className="grid gap-3">
          <ListBox
            aria-label="Choose a project"
            selectionMode="single"
            selectedKeys={selectedProjectKeys}
            onSelectionChange={setSelectedProjectKeys}
          >
            {projects.map((project) => (
              <ListBoxItem key={project.id} id={project.id} textValue={project.label}>
                {project.label}
              </ListBoxItem>
            ))}
          </ListBox>
          <p aria-live="polite" className="text-xs text-muted-foreground">
            Current project: {selectedProject[0] ?? "None"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-06" title="Custom Selection Indicator">
        <ListBox aria-label="Choose a favorite team" selectionMode="single" defaultSelectedKeys={new Set(["design"])}>
          {teams.slice(0, 3).map((team) => (
            <ListBoxItem
              key={team.id}
              id={team.id}
              textValue={team.label}
              indicator={<IconStar className="size-4 fill-current" />}
            >
              {team.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </ComponentPreview>

      <ComponentPreview previewId="list-box-07" title="Virtualized Options">
        <div className="grid w-full max-w-sm gap-2">
          <Virtualizer layout={resourceListLayout}>
            <ListBox
              aria-label="Choose a resource"
              selectionMode="single"
              items={resources}
              className="h-56 max-h-none"
            >
              {(resource) => (
                <ListBoxItem id={resource.id} textValue={resource.label}>
                  {resource.label}
                </ListBoxItem>
              )}
            </ListBox>
          </Virtualizer>
          <p className="text-xs text-muted-foreground">
            120 options; only visible rows are rendered.
          </p>
        </div>
      </ComponentPreview>
    </>
  )
}
