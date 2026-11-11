"use client";

import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import {
  IconCalendarEvent,
  IconCheck,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconMail,
  IconPlus,
  IconShieldCheck,
  IconUsersGroup,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { HoldToConfirm } from "@/components/composite/hold-to-confirm";
import { PasswordField } from "@/components/composite/password-field";
import { SegmentedControl, SegmentedControlItem } from "@/components/composite/segmented-control";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

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

const availabilityDays = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"] as const;
const availabilitySlots = ["09:00", "10:30", "13:00", "15:30"] as const;
export function AvailabilityPickerExample() {
  const [day, setDay] = useState<(typeof availabilityDays)[number]>("Wed 16");
  const [slot, setSlot] = useState<(typeof availabilitySlots)[number] | null>(null);
  const reduced = useReducedMotion();
  const available = useMemo(
    () =>
      new Set([
        "Mon 14-09:00",
        "Mon 14-13:00",
        "Tue 15-10:30",
        "Wed 16-10:30",
        "Wed 16-13:00",
        "Thu 17-15:30",
        "Fri 18-09:00",
        "Fri 18-10:30",
      ]),
    [],
  );
  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
          <IconCalendarEvent aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold tracking-tight">Find a time together</h2>
          <p className="text-muted-foreground mt-1 text-sm">Choose a slot where the core team is available.</p>
        </div>
      </div>
      <SegmentedControl
        value={day}
        onValueChange={(value) => {
          if (availabilityDays.includes(value as (typeof availabilityDays)[number])) {
            setDay(value as (typeof availabilityDays)[number]);
            setSlot(null);
          }
        }}
        aria-label="Choose a day"
        className="w-full max-w-full overflow-x-auto"
      >
        {availabilityDays.map((item) => (
          <SegmentedControlItem key={item} value={item} className="min-w-20 flex-1">
            {item}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div className="grid gap-2 sm:grid-cols-2">
        {availabilitySlots.map((item) => {
          const isAvailable = available.has(`${day}-${item}`);
          const selected = slot === item;
          return (
            <button
              key={item}
              type="button"
              disabled={!isAvailable}
              aria-pressed={selected}
              onClick={() => setSlot(item)}
              className={cn(
                "hover:bg-muted focus-visible:ring-ring flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-45",
                selected && "border-primary bg-primary/5",
              )}
            >
              <span className="font-medium">{item}</span>
              {selected ? (
                <IconCheck className="text-primary size-4" aria-hidden="true" />
              ) : (
                <span className="text-muted-foreground text-xs">{isAvailable ? "Available" : "Busy"}</span>
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {slot && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            className="bg-muted/30 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
            role="status"
          >
            <div>
              <p className="text-sm font-medium">
                {day} at {slot}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Maya, Alex, and Sam can join.</p>
            </div>
            <Button size="sm">Confirm time</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const permissionRows = [
  { key: "workspace", label: "Manage workspace", description: "Edit workspace details and defaults." },
  { key: "members", label: "Manage members", description: "Invite, remove, and change member roles." },
  { key: "billing", label: "View billing", description: "See plans, invoices, and payment details." },
  { key: "projects", label: "Create projects", description: "Start and archive workspace projects." },
] as const;
const permissionRoles = ["Admin", "Manager", "Member"] as const;
type PermissionRole = (typeof permissionRoles)[number];
type PermissionState = Record<PermissionRole, Record<(typeof permissionRows)[number]["key"], boolean>>;
const initialPermissionState: PermissionState = {
  Admin: { workspace: true, members: true, billing: true, projects: true },
  Manager: { workspace: false, members: true, billing: true, projects: true },
  Member: { workspace: false, members: false, billing: false, projects: true },
};

export function RolesPermissionsExample() {
  const [role, setRole] = useState<PermissionRole>("Manager");
  const [permissions, setPermissions] = useState<PermissionState>(initialPermissionState);
  const [saved, setSaved] = useState(true);
  const reduced = useReducedMotion();
  const toggle = (key: (typeof permissionRows)[number]["key"]) => {
    setPermissions((current) => ({ ...current, [role]: { ...current[role], [key]: !current[role][key] } }));
    setSaved(false);
  };
  const save = useCallback(() => setSaved(true), []);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "s" && !saved) {
        event.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [saved, save]);
  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
          <IconShieldCheck aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold tracking-tight">Roles and permissions</h2>
          <p className="text-muted-foreground mt-1 text-sm">Set what each role can access across the workspace.</p>
        </div>
      </div>
      <SegmentedControl
        value={role}
        onValueChange={(value) => {
          if (permissionRoles.includes(value as PermissionRole)) setRole(value as PermissionRole);
        }}
        aria-label="Choose a role"
      >
        {permissionRoles.map((item) => (
          <SegmentedControlItem key={item} value={item}>
            {item}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div className="divide-y rounded-lg border">
        {permissionRows.map((item) => (
          <label
            htmlFor={`permission-${item.key}`}
            key={item.key}
            className="hover:bg-muted/30 flex cursor-pointer items-start gap-3 p-4"
          >
            <Checkbox
              id={`permission-${item.key}`}
              checked={permissions[role][item.key]}
              onCheckedChange={() => toggle(item.key)}
            />
            <span className="min-w-0">
              <span className="block text-sm font-medium">{item.label}</span>
              <span className="text-muted-foreground mt-1 block text-sm">{item.description}</span>
            </span>
          </label>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {!saved && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            className="bg-card/95 sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 shadow-lg backdrop-blur-sm"
            role="status"
          >
            <span className="text-sm">
              Unsaved permission changes{" "}
              <span className="text-muted-foreground hidden sm:inline">· ⌘/Ctrl + S to save</span>
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPermissions(initialPermissionState);
                  setSaved(true);
                }}
              >
                Discard
              </Button>
              <Button type="button" size="sm" onClick={save}>
                Save changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SecuritySettingsExample() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [revoked, setRevoked] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const sessions = [
    { device: "MacBook Pro", detail: "Chrome 129 · San Francisco, US · Active now", current: true },
    { device: "iPhone 15 Pro", detail: "Fieldnote for iOS · San Francisco, US · 2 hours ago", current: false },
    { device: "Windows desktop", detail: "Edge 128 · Austin, US · Yesterday at 4:12 PM", current: false },
    { device: "iPad Air", detail: "Safari 18 · Lisbon, PT · Sep 14", current: false },
    { device: "ThinkPad X1", detail: "Firefox 130 · Berlin, DE · Sep 9", current: false },
  ];

  return (
    <section
      aria-labelledby="security-card-title"
      className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm"
    >
      <header className="border-border border-b p-5 sm:p-6">
        <h2 id="security-card-title" className="text-base font-medium">
          Security
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Control how you sign in to Fieldnote as maya@fieldnote.example.
        </p>
      </header>
      <div className="divide-border divide-y">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h3 className="text-sm font-medium">Two-factor authentication</h3>
            <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
              Ask for a code from your authenticator app when you sign in on a new device.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 text-sm">
              {twoFactor ? "On" : "Off"}
            </span>
            <Button
              className="rounded-full"
              size="lg"
              onClick={() => {
                setTwoFactor((value) => !value);
                setStatus(twoFactor ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
              }}
            >
              {twoFactor ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <h3 className="text-sm font-medium">Password</h3>
            <p className="text-muted-foreground mt-1 text-sm">Last changed March 4, 2026</p>
          </div>
          <Button className="rounded-full" variant="outline" onClick={() => setPasswordOpen((value) => !value)}>
            {passwordOpen ? "Close" : "Change password"}
          </Button>
        </div>
        <AnimatePresence initial={false}>
          {passwordOpen ? (
            <motion.form
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
              onSubmit={(event) => {
                event.preventDefault();
                setPasswordOpen(false);
                setStatus("Password updated");
              }}
              className="bg-muted/20 grid gap-4 overflow-hidden p-5 sm:p-6"
            >
              <PasswordField id="security-current" label="Current password" />
              <PasswordField id="security-new" label="New password" autoComplete="new-password" />
              <PasswordField id="security-confirm" label="Confirm new password" autoComplete="new-password" />
              <Button type="submit" className="w-fit rounded-full">
                Update password
              </Button>
            </motion.form>
          ) : null}
        </AnimatePresence>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="text-sm font-medium">
                Active sessions <span className="text-muted-foreground ml-1">{sessions.length}</span>
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Devices signed in to your account in the last 30 days.
              </p>
            </div>
          </div>
          <div className="divide-border mt-4 divide-y">
            {sessions
              .filter((session) => !revoked.includes(session.device))
              .map((session) => {
                const DeviceIcon = session.device === "iPhone 15 Pro" ? IconDeviceMobile : IconDeviceLaptop;
                return (
                  <div key={session.device} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="bg-muted grid size-8 shrink-0 place-items-center rounded-md" aria-hidden="true">
                      <DeviceIcon className="text-muted-foreground size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {session.device}
                        {session.current ? (
                          <span className="bg-muted text-muted-foreground ml-2 rounded-md px-2 py-0.5 text-xs font-normal">
                            This device
                          </span>
                        ) : null}
                      </p>
                      <p className="text-muted-foreground mt-1 truncate text-xs">{session.detail}</p>
                    </div>
                    {!session.current ? (
                      <Button
                        className="rounded-full"
                        variant="ghost"
                        onClick={() => {
                          setRevoked((value) => [...value, session.device]);
                          setStatus(`${session.device} revoked`);
                        }}
                      >
                        Revoke
                      </Button>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <p className="text-muted-foreground mt-4 text-xs">You stay signed in on this device</p>
          <HoldToConfirm
            className="mt-3 rounded-full"
            variant="outline"
            label="Sign out of other sessions"
            confirmedLabel="Other sessions signed out"
            duration={1200}
            onConfirm={() => {
              setRevoked(sessions.filter((session) => !session.current).map((session) => session.device));
              setStatus("Other sessions signed out");
            }}
          />
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </section>
  );
}
