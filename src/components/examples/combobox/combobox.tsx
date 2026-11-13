"use client";

import { useEffect, useState } from "react";

import { IconCalendar, IconUser } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  ComboBox,
  ComboBoxInput,
  ComboBoxInputGroup,
  ComboBoxPopover,
  ComboBoxTrigger,
  ComboBoxValue,
} from "@/components/ui/composite-combobox";
import { FieldError } from "@/components/ui/composite-field";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ListBox, ListBoxHeader, ListBoxItem, ListBoxSection } from "@/components/ui/list-box";
import { ComponentPreview } from "@/examples/component-preview";

const teams = [
  { id: "design", label: "Design", group: "Product", description: "Design systems and research" },
  { id: "engineering", label: "Engineering", group: "Product", description: "Application development" },
  { id: "finance", label: "Finance", group: "Operations" },
  { id: "operations", label: "Operations", group: "Operations", disabled: true },
];

const people = [
  { id: "maya", label: "Maya Chen", group: "Design", description: "maya.chen@company.test" },
  { id: "alex", label: "Alex Rivera", group: "Engineering", description: "alex.rivera@company.test" },
  { id: "sam", label: "Sam Patel", group: "Engineering", description: "sam.patel@company.test" },
  { id: "lee", label: "Lee Morgan", group: "Operations", description: "lee.morgan@company.test" },
];

function TeamOptions() {
  return (
    <>
      <ListBoxSection id="product">
        <ListBoxHeader>Product</ListBoxHeader>
        <ListBoxItem id="design" textValue="Design">
          Design <span className="ml-auto text-xs text-muted-foreground">Design systems and research</span>
        </ListBoxItem>
        <ListBoxItem id="engineering" textValue="Engineering">
          Engineering <span className="ml-auto text-xs text-muted-foreground">Application development</span>
        </ListBoxItem>
      </ListBoxSection>
      <ListBoxSection id="operations">
        <ListBoxHeader>Operations</ListBoxHeader>
        <ListBoxItem id="finance" textValue="Finance">
          Finance
        </ListBoxItem>
        <ListBoxItem id="operations-team" textValue="Operations" isDisabled>
          Operations
        </ListBoxItem>
      </ListBoxSection>
    </>
  );
}

function PeopleOptions() {
  return people.map((person) => (
    <ListBoxItem key={person.id} id={person.id} textValue={person.label}>
      <span className="min-w-0 flex-1">
        {person.label}
        <span className="block text-xs text-muted-foreground">{person.description}</span>
      </span>
    </ListBoxItem>
  ));
}

function AsyncPeopleExample() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<typeof people>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!inputValue.trim()) return;
    const timer = window.setTimeout(() => {
      const query = inputValue.toLocaleLowerCase();
      setItems(people.filter((person) => `${person.label} ${person.description}`.toLocaleLowerCase().includes(query)));
      setIsLoading(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [inputValue]);

  return (
    <ComboBox
      aria-label="Search workspace people"
      inputValue={inputValue}
      onInputChange={(value) => {
        setInputValue(value);
        setIsLoading(Boolean(value.trim()));
        if (!value.trim()) setItems([]);
      }}
      className="w-full max-w-sm"
    >
      <ComboBoxInputGroup>
        <ComboBoxInput placeholder="Search people…" />
        <ComboBoxTrigger aria-label="Show people" />
      </ComboBoxInputGroup>
      <ComboBoxPopover>
        {isLoading ? (
          <div role="status" className="px-3 py-4 text-sm text-muted-foreground">
            Searching…
          </div>
        ) : (
          <ListBox aria-label="People" items={items}>
            {(person) => (
              <ListBoxItem id={person.id} textValue={person.label}>
                {person.label}
              </ListBoxItem>
            )}
          </ListBox>
        )}
      </ComboBoxPopover>
    </ComboBox>
  );
}

function FormExample() {
  const [submitted, setSubmitted] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const errorId = "combobox-form-error";

  return (
    <Form
      aria-label="Assign a team"
      validationBehavior="aria"
      className="grid w-full max-w-sm gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const valid = Boolean(data.get("team"));
        setInvalid(!valid);
        setSubmitted(valid);
      }}
      onReset={() => {
        setInvalid(false);
        setSubmitted(false);
      }}
    >
      <ComboBox
        aria-label="Team"
        name="team"
        isRequired
        isInvalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className="w-full"
      >
        <ComboBoxInputGroup>
          <ComboBoxInput placeholder="Choose a team…" />
          <ComboBoxTrigger aria-label="Show teams" />
        </ComboBoxInputGroup>
        <ComboBoxPopover>
          <ListBox aria-label="Teams">
            <TeamOptions />
          </ListBox>
        </ComboBoxPopover>
      </ComboBox>
      {invalid && <FieldError id={errorId}>Choose a team before submitting.</FieldError>}
      <div className="flex flex-wrap gap-2">
        <Button type="submit" size="sm">
          Save assignment
        </Button>
        <Button type="reset" size="sm" variant="outline">
          Reset
        </Button>
        {submitted && (
          <span role="status" className="text-sm text-success">
            Assignment saved.
          </span>
        )}
      </div>
    </Form>
  );
}

export function ComboboxExamples() {
  const [team, setTeam] = useState<string | null>("engineering");
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<string[]>(["maya", "alex"]);
  const [status, setStatus] = useState<string | null>("open");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <>
        <ComponentPreview title="Default and Full Width" layout="grid2">
          <ComboBox aria-label="Favorite animal" className="w-full">
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Search animals…" />
              <ComboBoxTrigger aria-label="Show animals" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="Animals">
                <ListBoxItem id="cat">Cat</ListBoxItem>
                <ListBoxItem id="dog">Dog</ListBoxItem>
                <ListBoxItem id="bird">Bird</ListBoxItem>
              </ListBox>
            </ComboBoxPopover>
          </ComboBox>
          <ComboBox aria-label="Secondary variant" variant="secondary" className="w-full">
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Search another list…" />
              <ComboBoxTrigger aria-label="Show options" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="Options">
                <ListBoxItem id="one">Option one</ListBoxItem>
                <ListBoxItem id="two">Option two</ListBoxItem>
              </ListBox>
            </ComboBoxPopover>
          </ComboBox>
        </ComponentPreview>

        <ComponentPreview title="Sections and Disabled Options" layout="field">
          <ComboBox aria-label="Choose a team" className="w-full max-w-md">
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Search teams…" />
              <ComboBoxTrigger aria-label="Show teams" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="Teams">
                <TeamOptions />
              </ListBox>
            </ComboBoxPopover>
          </ComboBox>
        </ComponentPreview>

        <ComponentPreview title="Controlled Selection and Input" layout="field">
          <div className="grid w-full max-w-sm gap-2">
            <ComboBox
              aria-label="Choose a team"
              selectedKey={team}
              onSelectionChange={(key) => setTeam(typeof key === "string" ? key : null)}
              inputValue={query}
              onInputChange={setQuery}
              className="w-full"
            >
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Type to filter teams…" />
                <ComboBoxTrigger aria-label="Show teams" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Selected: {teams.find((item) => item.id === team)?.label ?? "None"} · Query: {query || "(empty)"}
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Required, Disabled, Read Only, and Invalid" layout="panel" span={2}>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            <ComboBox aria-label="Required team" isRequired className="w-full">
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Required team" />
                <ComboBoxTrigger aria-label="Show teams" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <ComboBox aria-label="Disabled team" isDisabled selectedKey="finance" className="w-full">
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Disabled team" />
                <ComboBoxTrigger aria-label="Show teams" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <ComboBox aria-label="Read-only team" isReadOnly selectedKey="design" className="w-full">
              <ComboBoxInputGroup>
                <ComboBoxInput />
                <ComboBoxTrigger aria-label="Show teams" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <ComboBox aria-label="Invalid team" isInvalid aria-describedby="combobox-invalid-help" className="w-full">
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Choose a valid team" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <p id="combobox-invalid-help" className="text-xs text-destructive">
              Select a team from the available options.
            </p>
          </div>
        </ComponentPreview>

        <ComponentPreview title="Custom Value and Filtering" layout="grid2">
          <ComboBox aria-label="Add a project label" allowsCustomValue className="w-full">
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Search or type a label…" />
              <ComboBoxTrigger aria-label="Show labels" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="Saved labels">
                <ListBoxItem id="bug">Bug</ListBoxItem>
                <ListBoxItem id="feature">Feature</ListBoxItem>
                <ListBoxItem id="blocked">Blocked</ListBoxItem>
              </ListBox>
            </ComboBoxPopover>
          </ComboBox>
          <ComboBox
            aria-label="Search teams by label"
            defaultFilter={(text, input) => text.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())}
            className="w-full"
          >
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Filter by first letters…" />
              <ComboBoxTrigger aria-label="Show teams" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="Teams">
                <TeamOptions />
              </ListBox>
            </ComboBoxPopover>
          </ComboBox>
        </ComponentPreview>

        <ComponentPreview title="Async Search" layout="field">
          <AsyncPeopleExample />
        </ComponentPreview>

        <ComponentPreview title="Multiple Selection" layout="stack" span={2}>
          <ComboBox
            aria-label="Select project members"
            selectionMode="multiple"
            value={members}
            onChange={(keys) =>
              setMembers(Array.isArray(keys) ? keys.filter((key): key is string => typeof key === "string") : [])
            }
            className="w-full max-w-md"
          >
            <ComboBoxInputGroup>
              <ComboBoxInput placeholder="Search members…" />
              <ComboBoxTrigger aria-label="Show members" />
            </ComboBoxInputGroup>
            <ComboBoxPopover>
              <ListBox aria-label="People" selectionMode="multiple">
                <PeopleOptions />
              </ListBox>
            </ComboBoxPopover>
            <ComboBoxValue aria-label="Selected members" className="flex flex-wrap gap-1 text-xs">
              {({ selectedText, isPlaceholder }) => (isPlaceholder ? "No members selected" : selectedText)}
            </ComboBoxValue>
          </ComboBox>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {members.length} members selected.
          </p>
        </ComponentPreview>

        <ComponentPreview title="Form Integration and Validation" layout="panel" span={2}>
          <FormExample />
        </ComponentPreview>

        <ComponentPreview title="Menu Trigger Behavior" layout="grid3">
          {(["focus", "input", "manual"] as const).map((menuTrigger) => (
            <ComboBox
              key={menuTrigger}
              aria-label={`${menuTrigger} trigger teams`}
              menuTrigger={menuTrigger}
              className="w-full"
            >
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder={`${menuTrigger} trigger`} />
                <ComboBoxTrigger aria-label="Show teams" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Teams">
                  <TeamOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
          ))}
        </ComponentPreview>

        <ComponentPreview title="Project Workflow" layout="panel" span={2}>
          <div className="grid min-w-0 gap-3 sm:grid-cols-3">
            <ComboBox
              aria-label="Change issue status"
              selectedKey={status}
              onSelectionChange={(key) => setStatus(typeof key === "string" ? key : null)}
              className="w-full"
            >
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Status" />
                <ComboBoxTrigger aria-label="Show statuses" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Statuses">
                  <ListBoxItem id="open">Open</ListBoxItem>
                  <ListBoxItem id="progress">In progress</ListBoxItem>
                  <ListBoxItem id="done">Done</ListBoxItem>
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <ComboBox aria-label="Set issue priority" className="w-full">
              <ComboBoxInputGroup>
                <ComboBoxInput placeholder="Priority" />
                <ComboBoxTrigger aria-label="Show priorities" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="Priorities">
                  {["Urgent", "High", "Normal", "Low"].map((label) => (
                    <ListBoxItem key={label} id={label.toLowerCase()}>
                      {label}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
            <ComboBox aria-label="Assign issue" className="w-full">
              <ComboBoxInputGroup>
                <IconUser className="ml-3 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <ComboBoxInput placeholder="Assignee" />
                <ComboBoxTrigger aria-label="Show people" />
              </ComboBoxInputGroup>
              <ComboBoxPopover>
                <ListBox aria-label="People">
                  <PeopleOptions />
                </ListBox>
              </ComboBoxPopover>
            </ComboBox>
          </div>
        </ComponentPreview>

        <ComponentPreview title="ComboBox Inside a Dialog">
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Assign a lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign project lead</DialogTitle>
              </DialogHeader>
              <ComboBox aria-label="Select project lead" className="w-full">
                <ComboBoxInputGroup>
                  <ComboBoxInput placeholder="Search people…" />
                  <ComboBoxTrigger aria-label="Show people" />
                </ComboBoxInputGroup>
                <ComboBoxPopover>
                  <ListBox aria-label="People">
                    <PeopleOptions />
                  </ListBox>
                </ComboBoxPopover>
              </ComboBox>
            </DialogContent>
          </Dialog>
        </ComponentPreview>

        <ComponentPreview title="Due Date Shortcuts" layout="field">
          <div className="grid w-full max-w-md gap-3">
            <div className="flex items-center gap-2">
              <IconCalendar className="size-4 text-muted-foreground" aria-hidden="true" />
              <ComboBox
                aria-label="Select due date"
                selectedKey={dueDate}
                onSelectionChange={(key) => setDueDate(typeof key === "string" ? key : null)}
                className="w-full"
              >
                <ComboBoxInputGroup>
                  <ComboBoxInput placeholder="Choose a due date" />
                  <ComboBoxTrigger aria-label="Show due dates" />
                </ComboBoxInputGroup>
                <ComboBoxPopover>
                  <ListBox aria-label="Due dates">
                    <ListBoxItem id="today">Today</ListBoxItem>
                    <ListBoxItem id="tomorrow">Tomorrow</ListBoxItem>
                    <ListBoxItem id="friday">This Friday</ListBoxItem>
                    <ListBoxItem id="monday">Next Monday</ListBoxItem>
                  </ListBox>
                </ComboBoxPopover>
              </ComboBox>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setDateDialogOpen(true)}>
                Custom date
              </Button>
              <span aria-live="polite" className="self-center text-xs text-muted-foreground">
                {customDate || dueDate || "No date selected"}
              </span>
            </div>
          </div>
        </ComponentPreview>
      </>

      <Dialog open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a custom due date</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <input
              aria-label="Custom due date"
              type="date"
              value={customDate}
              onChange={(event) => setCustomDate(event.currentTarget.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            />
            <Button
              type="button"
              disabled={!customDate}
              onClick={() => {
                setDueDate("custom");
                setDateDialogOpen(false);
              }}
            >
              Use this date
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
