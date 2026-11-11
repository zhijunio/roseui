"use client";

import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { IconArrowUpRight, IconCheck, IconCopy, IconMail, IconSearch, IconUserPlus, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserAvatar } from "@/data/user";
import { cn } from "@/lib/utils";
export const people = [
  {
    id: "alex",
    name: "Alex Morgan",
    role: "Product designer",
    team: "Design",
    location: "Lisbon, Portugal",
    timezone: "WET (UTC+0)",
    email: "alex.morgan@roseui.com",
    status: "Available",
    initials: "AM",
  },
  {
    id: "sofia",
    name: "Sofia Rossi",
    role: "Engineering lead",
    team: "Engineering",
    location: "Austin, United States",
    timezone: "CT (UTC-6)",
    email: "sofia.rossi@roseui.com",
    status: "In a meeting",
    initials: "SR",
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "Operations manager",
    team: "Operations",
    location: "Singapore",
    timezone: "SGT (UTC+8)",
    email: "marcus.chen@roseui.com",
    status: "Available",
    initials: "MC",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Research lead",
    team: "Design",
    location: "Warsaw, Poland",
    timezone: "CET (UTC+1)",
    email: "priya.nair@roseui.com",
    status: "Away",
    initials: "PN",
  },
  {
    id: "daniel",
    name: "Daniel Weber",
    role: "Staff engineer",
    team: "Engineering",
    location: "London, United Kingdom",
    timezone: "GMT (UTC+0)",
    email: "daniel.weber@roseui.com",
    status: "Available",
    initials: "DW",
  },
  {
    id: "hannah",
    name: "Hannah Kim",
    role: "People partner",
    team: "Operations",
    location: "New York, United States",
    timezone: "ET (UTC-5)",
    email: "hannah.kim@roseui.com",
    status: "Offline",
    initials: "HK",
  },
] as const;

export type Person = (typeof people)[number];
export function personAvatar(name: string) {
  return getUserAvatar(name);
}
export const teamNames = ["All people", "Design", "Engineering", "Operations"] as const;

function PersonAvatar({ person, size = "sm" }: { person: Person; size?: "xs" | "sm" | "default" | "lg" | "xl" }) {
  return (
    <Avatar size={size}>
      <AvatarImage src={personAvatar(person.name)} alt="" />
      <AvatarFallback>{person.initials}</AvatarFallback>
    </Avatar>
  );
}

function statusVariant(status: Person["status"]): "success-light" | "warning-light" | "secondary" {
  if (status === "Available") return "success-light";
  if (status === "In a meeting" || status === "Away") return "warning-light";
  return "secondary";
}

function CopyEmail({ email, name }: { email: string; name: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <Button type="button" size="sm" variant="outline" onClick={() => void copy()}>
      <IconCopy aria-hidden="true" />
      {copied ? "Copied" : `Copy ${name.split(" ")[0]}'s email`}
    </Button>
  );
}

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

type Member = Person & { roleName: "Admin" | "Editor" | "Viewer" };
const memberRoles = ["Admin", "Editor", "Viewer"] as const;
function isMemberRole(value: string): value is Member["roleName"] {
  return memberRoles.some((role) => role === value);
}
const initialMembers: Member[] = people
  .slice(0, 5)
  .map((person, index) => ({ ...person, roleName: index === 0 ? "Admin" : index < 3 ? "Editor" : "Viewer" }));

export function TeamMembersExample() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [savedMembers, setSavedMembers] = useState<Member[]>(initialMembers);
  const [invite, setInvite] = useState("");
  const [pending, setPending] = useState<string[]>(["riley@northwind.studio"]);
  const [savedPending, setSavedPending] = useState<string[]>(["riley@northwind.studio"]);
  const [saved, setSaved] = useState(true);
  const [lastRemoved, setLastRemoved] = useState<Member | null>(null);
  const reduced = useReducedMotion();
  const dirty = !saved;
  function addInvites(event: FormEvent) {
    event.preventDefault();
    const emails = invite
      .split(/[\s,]+/)
      .map((value) => value.trim().toLocaleLowerCase())
      .filter((value) => value.includes("@") && !pending.includes(value));
    if (emails.length) {
      setPending((current) => [...current, ...emails]);
      setInvite("");
      setSaved(false);
    }
  }
  function changeRole(id: string, roleName: Member["roleName"]) {
    setMembers((current) => current.map((member) => (member.id === id ? { ...member, roleName } : member)));
    setSaved(false);
  }
  function removeMember(member: Member) {
    setMembers((current) => current.filter((item) => item.id !== member.id));
    setLastRemoved(member);
    setSaved(false);
  }
  function undoRemove() {
    if (lastRemoved) {
      setMembers((current) => [...current, lastRemoved]);
      setLastRemoved(null);
      setSaved(false);
    }
  }
  const saveChanges = useCallback(() => {
    setSavedMembers(members);
    setSavedPending(pending);
    setSaved(true);
    setLastRemoved(null);
  }, [members, pending]);
  function discardChanges() {
    setMembers(savedMembers);
    setPending(savedPending);
    setInvite("");
    setLastRemoved(null);
    setSaved(true);
  }
  useEffect(() => {
    function saveShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "s" && dirty) {
        event.preventDefault();
        saveChanges();
      }
    }
    window.addEventListener("keydown", saveShortcut);
    return () => window.removeEventListener("keydown", saveShortcut);
  }, [dirty, saveChanges]);
  return (
    <div className="grid min-w-0 gap-5">
      <div className="border-border bg-muted/20 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium">Workspace seats</p>
          <p className="text-muted-foreground mt-1 text-sm">{members.length + pending.length} of 8 seats assigned</p>
        </div>
        <div
          className="bg-muted h-2 w-full overflow-hidden rounded-full sm:w-48"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={8}
          aria-valuenow={members.length + pending.length}
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${Math.min(100, ((members.length + pending.length) / 8) * 100)}%` }}
          />
        </div>
      </div>
      <form onSubmit={addInvites} className="border-border grid gap-3 rounded-lg border p-4">
        <div>
          <label htmlFor="people-invite" className="text-sm font-medium">
            Invite teammates
          </label>
          <p className="text-muted-foreground mt-1 text-sm">Add one or more email addresses separated by commas.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="people-invite"
            value={invite}
            onChange={(event) => setInvite(event.currentTarget.value)}
            placeholder="name@company.com"
            type="email"
            multiple
            inputMode="email"
          />
          <Button type="submit">
            <IconMail aria-hidden="true" />
            Send invite
          </Button>
        </div>
        {pending.length > 0 && (
          <section className="flex flex-wrap gap-2" aria-label="Pending invites">
            {pending.map((email) => (
              <span
                key={email}
                className="bg-muted inline-flex max-w-full items-center gap-1 rounded-full border px-2.5 py-1 text-xs"
              >
                <span className="truncate">{email}</span>
                <button
                  type="button"
                  aria-label={`Remove invitation for ${email}`}
                  onClick={() => {
                    setPending((current) => current.filter((item) => item !== email));
                    setSaved(false);
                  }}
                  className="text-muted-foreground hover:bg-background hover:text-foreground focus-visible:ring-ring rounded-full p-0.5 focus-visible:ring-2"
                >
                  <IconX aria-hidden="true" className="size-3" />
                </button>
              </span>
            ))}
          </section>
        )}
      </form>
      <div className="border-border overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <caption className="sr-only">Workspace members and roles</caption>
          <thead className="bg-muted/30 text-muted-foreground border-b text-xs">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PersonAvatar person={member} />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{member.name}</span>
                      <span className="text-muted-foreground block truncate text-xs">{member.email}</span>
                    </span>
                  </div>
                </td>
                <td className="text-muted-foreground px-4 py-3">{member.team}</td>
                <td className="px-4 py-3">
                  <select
                    aria-label={`Role for ${member.name}`}
                    value={member.roleName}
                    onChange={(event) => {
                      const value = event.currentTarget.value;
                      if (isMemberRole(value)) changeRole(member.id, value);
                    }}
                    className="border-input bg-background focus-visible:ring-ring h-8 rounded-md border px-2 text-sm outline-none focus-visible:ring-2"
                  >
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeMember(member)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {lastRemoved && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            className="border-warning/40 bg-warning-soft flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm"
            role="status"
          >
            <span>{lastRemoved.name} was removed.</span>
            <Button type="button" size="sm" variant="ghost" onClick={undoRemove}>
              Undo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {dirty && (
        <div className="border-border bg-card/95 sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 shadow-lg backdrop-blur-sm">
          <span className="flex items-center gap-2 text-sm">
            <IconCheck aria-hidden="true" className="text-accent-strong size-4" />
            <span>
              Unsaved changes <span className="text-muted-foreground hidden sm:inline">· ⌘/Ctrl + S to save</span>
            </span>
          </span>
          <div className="flex gap-2">
            <Button type="button" size="sm" variant="ghost" onClick={discardChanges}>
              Discard
            </Button>
            <Button type="button" size="sm" onClick={saveChanges}>
              Save changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

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
