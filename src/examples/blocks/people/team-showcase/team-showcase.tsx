"use client";

import { useState } from "react";

import { IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { Person } from "../team-directory/data";
import { people } from "../team-directory/data";
import { PersonAvatar } from "../team-directory/shared";

const showcaseVariants = ["Gallery", "Filmstrip", "Directory", "Spotlight"] as const;
type ShowcaseVariant = (typeof showcaseVariants)[number];
function isShowcaseVariant(value: string): value is ShowcaseVariant {
  return showcaseVariants.some((item) => item === value);
}

export function TeamShowcaseExample() {
  const [variant, setVariant] = useState<ShowcaseVariant>("Gallery");
  const [selectedId, setSelectedId] = useState<Person["id"]>(people[0].id);
  const reduced = useReducedMotion();
  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  return (
    <div className="grid min-w-0 gap-5">
      <Tabs
        value={variant}
        onValueChange={(value) => {
          if (isShowcaseVariant(value)) setVariant(value);
        }}
      >
        <TabsList aria-label="Team showcase layout">
          <TabsTrigger value="Gallery">Gallery</TabsTrigger>
          <TabsTrigger value="Filmstrip">Filmstrip</TabsTrigger>
          <TabsTrigger value="Directory">Directory</TabsTrigger>
          <TabsTrigger value="Spotlight">Spotlight</TabsTrigger>
        </TabsList>
      </Tabs>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={variant}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.2 }}
          className="min-w-0"
        >
          {variant === "Gallery" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((person) => (
                <ShowcaseCard
                  key={person.id}
                  person={person}
                  selected={selected.id === person.id}
                  onSelect={() => setSelectedId(person.id)}
                />
              ))}
            </div>
          )}
          {variant === "Filmstrip" && (
            <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
              {people.map((person) => (
                <ShowcaseCard
                  key={person.id}
                  person={person}
                  selected={selected.id === person.id}
                  onSelect={() => setSelectedId(person.id)}
                  className="w-64 shrink-0 snap-start"
                />
              ))}
            </div>
          )}
          {variant === "Directory" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {people.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  aria-expanded={selected.id === person.id}
                  onClick={() => setSelectedId(person.id)}
                  className={cn(
                    "hover:bg-muted/50 focus-visible:ring-ring flex items-center gap-3 rounded-lg border p-3 text-left transition-colors outline-none focus-visible:ring-2",
                    selected.id === person.id && "border-primary/50 bg-muted/50",
                  )}
                >
                  <PersonAvatar person={person} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{person.name}</span>
                    <span className="text-muted-foreground block truncate text-xs">{person.role}</span>
                  </span>
                  <IconArrowUpRight aria-hidden="true" className="text-muted-foreground size-4" />
                </button>
              ))}
            </div>
          )}
          {variant === "Spotlight" && (
            <div className="border-border bg-muted/20 grid overflow-hidden rounded-xl border lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="bg-primary/10 flex min-h-72 items-end p-6 sm:min-h-96">
                <div>
                  <Badge variant="secondary">{selected.team}</Badge>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{selected.name}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">{selected.role}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6 p-5">
                <div>
                  <PersonAvatar person={selected} size="xl" />
                  <p className="text-muted-foreground mt-4 text-sm leading-6">
                    {selected.name} helps the team make thoughtful decisions and keep work moving with clarity.
                  </p>
                </div>
                <div className="grid gap-2">
                  {people.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => setSelectedId(person.id)}
                      className={cn(
                        "hover:bg-muted flex items-center gap-2 rounded-md p-2 text-left text-sm",
                        selected.id === person.id && "bg-muted font-medium",
                      )}
                    >
                      <PersonAvatar person={person} size="xs" />
                      {person.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ShowcaseCard({
  person,
  selected,
  onSelect,
  className,
}: {
  person: Person;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "group border-border bg-card hover:border-primary/50 focus-visible:ring-ring min-w-0 overflow-hidden rounded-xl border text-left transition-[border-color,transform] outline-none hover:-translate-y-0.5 focus-visible:ring-2 motion-reduce:transition-none",
        selected && "border-primary/60",
        className,
      )}
    >
      <div className="bg-primary/10 flex aspect-[4/3] items-end p-4">
        <PersonAvatar person={person} size="xl" />
      </div>
      <div className="p-4">
        <p className="font-medium">{person.name}</p>
        <p className="text-muted-foreground mt-1 text-sm">{person.role}</p>
        <p className="text-muted-foreground mt-3 text-xs">{person.team}</p>
      </div>
    </button>
  );
}
