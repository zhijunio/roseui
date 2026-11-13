"use client";

import { useState } from "react";

import { IconCheck, IconLink, IconMail, IconPlus, IconX } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { users as exampleUsers } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";
import { getInitials } from "@/lib/utils";

const people = [
  { ...exampleUsers[1], role: "Editor" },
  { ...exampleUsers[0], role: "Viewer" },
  { ...exampleUsers[2], role: "Viewer" },
];

function AccessPopover() {
  const [selected, setSelected] = useState(["sofia", "alex"]);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const visible = people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  const copyInvite = async () => {
    await navigator.clipboard?.writeText("https://workspace.test/invite");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <IconLink />
          Share access
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(22rem,calc(100vw-2rem))] p-3">
        <div className="space-y-3">
          <div>
            <p className="font-medium">People with access</p>
            <p className="text-xs text-muted-foreground">Invite people to this workspace.</p>
          </div>
          <div className="space-y-1.5">
            {selected.map((id) => {
              const person = people.find((item) => item.id === id);
              return person ? (
                <div key={id} className="flex items-center gap-2 rounded-md px-1 py-1">
                  <Avatar size="sm">
                    <AvatarImage src={person.avatar} alt="" />
                    <AvatarFallback>{getInitials(person.name, true)}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate text-sm">{person.name}</span>
                  <Badge variant="outline">{person.role}</Badge>
                  <button
                    type="button"
                    aria-label={`Remove ${person.name}`}
                    onClick={() => setSelected((current) => current.filter((item) => item !== id))}
                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <IconX className="size-3.5" />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <div className="relative">
            <IconPlus className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Add a person"
              aria-label="Search people to add"
              className="pl-8"
            />
          </div>
          {query && (
            <div className="grid gap-1" role="listbox" aria-label="People to add">
              {visible.map((person) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={selected.includes(person.id)}
                  key={person.id}
                  onClick={() => {
                    setSelected((current) => (current.includes(person.id) ? current : [...current, person.id]));
                    setQuery("");
                  }}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Avatar size="sm">
                    <AvatarImage src={person.avatar} alt="" />
                    <AvatarFallback>{getInitials(person.name, true)}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1">{person.name}</span>
                  {selected.includes(person.id) && <IconCheck className="size-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
          <Button variant="outline" size="sm" className="w-full" onClick={copyInvite}>
            <IconMail />
            {copied ? "Invite link copied" : "Copy invite link"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function ShareAccessExamples() {
  return (
    <>
      <ComponentPreview title="Access popover" layout="field">
        <AccessPopover />
      </ComponentPreview>
      <ComponentPreview title="Compact trigger" layout="field">
        <Button variant="outline" size="sm">
          <IconLink />
          Copy share link
        </Button>
      </ComponentPreview>
    </>
  );
}
