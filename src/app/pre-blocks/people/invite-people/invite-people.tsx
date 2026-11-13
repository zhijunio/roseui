"use client";

import { type FormEvent, useState } from "react";

import { IconMail, IconPlus, IconUsersGroup } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";

const inviteRoles = ["Member", "Manager", "Admin"] as const;
type InviteRole = (typeof inviteRoles)[number];

export function InvitePeopleExample() {
  const [emailText, setEmailText] = useState("");
  const [role, setRole] = useState<InviteRole>("Member");
  const [invites, setInvites] = useState<Array<{ email: string; role: InviteRole }>>([]);
  const [sent, setSent] = useState(false);
  function addInvites(event: FormEvent) {
    event.preventDefault();
    const next = emailText
      .split(/[\s,]+/)
      .map((email) => email.trim().toLocaleLowerCase())
      .filter((email) => email.includes("@"))
      .filter((email) => !invites.some((item) => item.email === email));
    if (next.length) {
      setInvites((current) => [...current, ...next.map((email) => ({ email, role }))]);
      setEmailText("");
      setSent(false);
    }
  }
  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
          <IconUsersGroup aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold tracking-tight">Invite your workspace</h2>
          <p className="text-muted-foreground mt-1 text-sm">Add teammates in batches and set their starting role.</p>
        </div>
      </div>
      <form onSubmit={addInvites} className="border-border grid gap-3 rounded-lg border p-4">
        <Label htmlFor="invite-people-email">Email addresses</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="invite-people-email"
            value={emailText}
            onChange={(event) => setEmailText(event.currentTarget.value)}
            placeholder="name@company.com, teammate@company.com"
            type="email"
            multiple
            inputMode="email"
          />
          <NativeSelect
            aria-label="Invite role"
            value={role}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (inviteRoles.includes(value as InviteRole)) setRole(value as InviteRole);
            }}
          >
            <option>Member</option>
            <option>Manager</option>
            <option>Admin</option>
          </NativeSelect>
          <Button type="submit">
            <IconPlus aria-hidden="true" />
            Add
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">Paste several addresses separated by commas or spaces.</p>
      </form>
      <div className="grid gap-2">
        {invites.map((invite) => (
          <div key={invite.email} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
            <span className="bg-muted grid size-8 place-items-center rounded-full text-xs font-medium">
              {invite.email.slice(0, 2).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm">{invite.email}</span>
            <Badge variant="secondary">{invite.role}</Badge>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              aria-label={`Remove ${invite.email}`}
              onClick={() => setInvites((current) => current.filter((item) => item.email !== invite.email))}
            >
              Remove
            </Button>
          </div>
        ))}
        {invites.length === 0 && (
          <div className="text-muted-foreground rounded-lg border border-dashed px-4 py-8 text-center text-sm">
            Your invite list is empty.
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <span className="text-muted-foreground text-sm">
          {invites.length} {invites.length === 1 ? "person" : "people"} ready to invite
        </span>
        <Button type="button" disabled={!invites.length} onClick={() => setSent(true)}>
          <IconMail aria-hidden="true" />
          {sent ? "Invites sent" : "Send invites"}
        </Button>
      </div>
    </div>
  );
}
