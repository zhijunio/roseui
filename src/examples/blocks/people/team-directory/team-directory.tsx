"use client";

import { useMemo, useState } from "react";

import { IconArrowUpRight, IconSearch, IconUserPlus } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { Person } from "./data";
import { people, teamNames } from "./data";
import { CopyEmail, PersonAvatar, statusVariant } from "./shared";

export function TeamDirectoryExample() {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState<(typeof teamNames)[number]>("All people");
  const [selectedId, setSelectedId] = useState<Person["id"]>(people[0].id);
  const reduced = useReducedMotion();
  const visiblePeople = useMemo(
    () =>
      people.filter((person) => {
        const matchesTeam = team === "All people" || person.team === team;
        return (
          matchesTeam &&
          `${person.name} ${person.role} ${person.team}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
        );
      }),
    [query, team],
  );
  const selected = people.find((person) => person.id === selectedId) ?? visiblePeople[0] ?? people[0];
  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <div className="min-w-0 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-medium">Workspace people</h2>
            <p className="text-muted-foreground mt-1 text-sm">Find a teammate and see how to reach them.</p>
          </div>
          <Button size="sm">
            <IconUserPlus aria-hidden="true" />
            Invite people
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative block">
            <IconSearch
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 size-4"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
              }}
              placeholder="Search people"
              aria-label="Search people"
              className="pl-9"
            />
          </div>
          <fieldset className="flex min-w-0 gap-1 overflow-x-auto pb-1">
            <legend className="sr-only">Filter people by team</legend>
            {teamNames.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={team === item}
                onClick={() => setTeam(item)}
                className={cn(
                  "text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring shrink-0 rounded-md px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2",
                  team === item && "bg-muted text-foreground font-medium",
                )}
              >
                {item}
                <span className="text-muted-foreground ml-1.5 text-xs tabular-nums">
                  {item === "All people" ? people.length : people.filter((person) => person.team === item).length}
                </span>
              </button>
            ))}
          </fieldset>
        </div>
        <div className="border-border overflow-hidden rounded-lg border">
          <div
            className="bg-muted/30 text-muted-foreground border-b px-3 py-2 text-xs"
            role="status"
            aria-live="polite"
          >
            {visiblePeople.length} {visiblePeople.length === 1 ? "person" : "people"}
          </div>
          <div className="divide-border divide-y">
            {visiblePeople.length ? (
              visiblePeople.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  aria-pressed={selected.id === person.id}
                  onClick={() => setSelectedId(person.id)}
                  className={cn(
                    "hover:bg-muted/50 focus-visible:ring-ring flex w-full items-center gap-3 p-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset",
                    selected.id === person.id && "bg-muted/60",
                  )}
                >
                  <PersonAvatar person={person} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{person.name}</span>
                    <span className="text-muted-foreground block truncate text-xs">{person.role}</span>
                  </span>
                  <Badge variant={statusVariant(person.status)}>{person.status}</Badge>
                  <IconArrowUpRight aria-hidden="true" className="text-muted-foreground hidden size-4 sm:block" />
                </button>
              ))
            ) : (
              <div className="text-muted-foreground px-4 py-10 text-center text-sm">No people match this search.</div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.aside
          key={selected.id}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -4 }}
          transition={reduced ? { duration: 0 } : { duration: 0.18 }}
          aria-live="polite"
          className="border-border bg-muted/20 min-w-0 rounded-lg border p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <PersonAvatar person={selected} size="xl" />
            <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold tracking-tight">{selected.name}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {selected.role} · {selected.team}
            </p>
          </div>
          <div className="border-border mt-6 grid gap-4 border-t pt-5 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Email</p>
              <p className="mt-1 font-medium break-all">{selected.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Location</p>
              <p className="mt-1">{selected.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Time zone</p>
              <p className="mt-1">{selected.timezone}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <CopyEmail email={selected.email} name={selected.name} />
            <Button size="sm" variant="ghost" aria-label={`Open ${selected.name}'s profile`}>
              <IconArrowUpRight aria-hidden="true" />
              Profile
            </Button>
          </div>
        </motion.aside>
      </AnimatePresence>
    </div>
  );
}
