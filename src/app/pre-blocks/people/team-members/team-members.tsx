"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";

import { IconCheck, IconMail, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Person } from "../team-directory/data";
import { people } from "../team-directory/data";
import { PersonAvatar } from "../team-directory/shared";

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
