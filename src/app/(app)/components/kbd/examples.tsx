import {
  IconArrowLeft,
  IconCircleDashed,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/composite/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const shortcuts = [
  { label: "Search workspace", keys: ["⌘", "K"] },
  { label: "Create project", keys: ["⌘", "N"] },
  { label: "Save changes", keys: ["⌘", "S"] },
  { label: "Undo action", keys: ["⌘", "Z"] },
  { label: "Redo action", keys: ["⌘", "⇧", "Z"] },
];

export function KbdExamples() {
  return (
    <>
      <ComponentPreview previewId="kbd-01" title="Basic Keyboard Keys">
                  <div className="flex w-full items-center justify-center gap-2">
                    <Kbd>Ctrl</Kbd><Kbd>⌘K</Kbd><Kbd>Ctrl + B</Kbd>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-02" title="Grouped Keyboard Keys">
                  <div className="flex w-full items-center justify-center">
                    <KbdGroup><Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>P</Kbd></KbdGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-03" title="Navigation and Special Keys" span={2}>
                  <div className="mx-auto grid w-full max-w-md gap-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Navigate</span>
                      <KbdGroup>
                        <Kbd title="Arrow up">↑</Kbd>
                        <Kbd title="Arrow down">↓</Kbd>
                        <Kbd title="Arrow left">←</Kbd>
                        <Kbd title="Arrow right">→</Kbd>
                      </KbdGroup>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Move through a page</span>
                      <KbdGroup>
                        <Kbd title="Page up">PgUp</Kbd>
                        <Kbd title="Page down">PgDn</Kbd>
                        <Kbd title="Home">Home</Kbd>
                        <Kbd title="End">End</Kbd>
                      </KbdGroup>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">Confirm or cancel</span>
                      <KbdGroup>
                        <Kbd title="Enter">↵</Kbd>
                        <Kbd title="Escape">Esc</Kbd>
                        <Kbd title="Tab">⇥</Kbd>
                      </KbdGroup>
                    </div>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-04" title="Keyboard Keys with Icons" span={2}>
                  <div className="flex w-full items-center justify-center">
                    <KbdGroup>
                      <Kbd><IconArrowLeft className="size-3" /> Back</Kbd>
                      <Kbd><IconCircleDashed className="size-3" /> Voice input</Kbd>
                    </KbdGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-05" title="Keyboard Key in Input">
                  <div className="flex w-full items-center justify-center">
                    <InputGroup className="max-w-xs">
                      <InputGroupInput aria-label="Search records" placeholder="Search records…" />
                      <InputGroupAddon align="inline-end"><Kbd>Space</Kbd></InputGroupAddon>
                    </InputGroup>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-06" title="Shortcut in Tooltip">
                  <div className="flex w-full items-center justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon" aria-label="Save changes"><IconDeviceFloppy /></Button>
                        </TooltipTrigger>
                        <TooltipContent><span>Save changes</span><Kbd>S</Kbd></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-07" title="Shortcuts Reference List" span={2}>
                  <div className="mx-auto flex w-full max-w-md flex-col">
                    <p className="mb-3 text-sm font-medium">Workspace shortcuts</p>
                    <Separator />
                    <div className="flex flex-col">
                      {shortcuts.map((shortcut) => (
                        <div key={shortcut.label} className="flex items-center justify-between border-b py-2.5 last:border-b-0">
                          <span className="text-sm text-muted-foreground">{shortcut.label}</span>
                          <KbdGroup>{shortcut.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}</KbdGroup>
                        </div>
                      ))}
                    </div>
                  </div>
                </ComponentPreview>

                <ComponentPreview previewId="kbd-08" title="Inline Shortcut Instructions" span={2}>
                  <div className="mx-auto w-full max-w-lg space-y-3 text-sm leading-6">
                    <p>Press <Kbd title="Escape">Esc</Kbd> to close the dialog.</p>
                    <p>Use <Kbd title="Command">⌘</Kbd><Kbd>K</Kbd> to open search.</p>
                    <p>Navigate with <Kbd title="Arrow up">↑</Kbd> and <Kbd title="Arrow down">↓</Kbd>.</p>
                    <p>Press <Kbd title="Command">⌘</Kbd><Kbd>S</Kbd> to save your work.</p>
                  </div>
                </ComponentPreview>
    </>
  );
}
