"use client";

import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { IconCheck, IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const sections = ["General", "Appearance", "Notifications", "Security", "Members", "Billing"] as const;
type Section = (typeof sections)[number];

const settings = {
  General: [
    ["Workspace name", "Shown in the sidebar, invites, and emails."],
    ["Workspace URL", "Changing it breaks old links for 30 days."],
    ["Language", "Used for dates, numbers, and interface text."],
    ["Time zone", "Due dates and digests follow this zone."],
    ["Week starts on", "Affects calendars and weekly reports."],
  ],
  Appearance: [
    ["Theme", "Match the system or pick one."],
    ["Density", "Compact fits more rows in lists and tables."],
    ["Text size", "Scales text across the app."],
    ["Sidebar counts", "Show unread counts beside each view."],
    ["Interface motion", "Turn off to swap movement for fades."],
  ],
  Notifications: [
    ["Mentions", "When someone @mentions you or your team."],
    ["Assigned to me", "New issues and reviews that land on you."],
    ["Failed deploys", "Builds that fail on a branch you own."],
    ["Weekly digest", "A Monday summary of what shipped."],
    ["Email delivery", "Batch emails to cut down on noise."],
  ],
  Security: [
    ["Require two-step sign in", "Everyone adds an authenticator app or key."],
    ["Enforce SAML single sign-on", "Members sign in through Okta only."],
    ["Session length", "Idle people are signed out after this."],
    ["IP allowlist", "Only office and VPN addresses can sign in."],
    ["Audit log retention", "How long sign ins and changes are kept."],
  ],
  Members: [
    ["Default role", "Given to everyone who joins by invite link."],
    ["Who can invite", "Admins approve requests from everyone else."],
    ["Guest access", "Guests see only projects shared with them."],
    ["Allowed email domains", "People with these addresses join without an invite."],
  ],
  Billing: [
    ["Billing email", "Receipts and payment alerts go here."],
    ["Invoice currency", "Applies from the next billing period."],
    ["Spend alerts", "Email admins at 80% of the monthly budget."],
    ["VAT number", "Printed on every invoice."],
  ],
} satisfies Record<Section, readonly (readonly [string, string])[]>;

function SettingRow({
  label,
  description,
  index,
  onChange,
}: {
  label: string;
  description: string;
  index: number;
  onChange: () => void;
}) {
  const [value, setValue] = useState(index === 0 ? "Northwind Studio" : index === 1 ? "roseui.dev/northwind" : "");
  const [enabled, setEnabled] = useState(true);
  const isSelect =
    /Language|Time zone|Week starts|Theme|Density|Text size|Session length|retention|role|invite|currency/.test(label);
  const isSwitch = /counts|motion|Mentions|Assigned|Failed|digest|delivery|two-step|SAML|allowlist|Guest|alerts/.test(
    label,
  );
  return (
    <div className="border-border/70 grid gap-3 border-b py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,1fr)] sm:items-center">
      <div className="min-w-0">
        <label htmlFor={`settings-command-${index}`} className="text-sm font-medium">
          {label}
        </label>
        <p className="text-muted-foreground mt-1 text-sm leading-5">{description}</p>
      </div>
      {isSwitch ? (
        <Switch
          id={`settings-command-${index}`}
          checked={enabled}
          onCheckedChange={(next) => {
            setEnabled(next);
            onChange();
          }}
          aria-label={label}
          className="sm:justify-self-end"
        />
      ) : isSelect ? (
        <Select
          value={value || "default"}
          onValueChange={(next) => {
            setValue(next);
            onChange();
          }}
        >
          <SelectTrigger id={`settings-command-${index}`} className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="comfortable">Comfortable</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="admins">Admins</SelectItem>
            <SelectItem value="24-hours">24 hours</SelectItem>
            <SelectItem value="1-year">1 year</SelectItem>
            <SelectItem value="euro">Euro (EUR)</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={`settings-command-${index}`}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            onChange();
          }}
          placeholder={label === "Billing email" ? "billing@northwind.studio" : undefined}
        />
      )}
    </div>
  );
}

export function SettingsCommandExample() {
  const [active, setActive] = useState<Section>("General");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [changed, setChanged] = useState(0);
  const reduced = useReducedMotion();
  const tabRefs = useRef<Partial<Record<Section, HTMLButtonElement>>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const visibleRows = useMemo(
    () =>
      settings[active].filter(([label, description]) =>
        `${label} ${description}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [active, query],
  );

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? sections.length - 1
          : direction
            ? (index + direction + sections.length) % sections.length
            : -1;
    if (next >= 0) {
      event.preventDefault();
      setActive(sections[next]);
      tabRefs.current[sections[next]]?.focus();
    }
  }

  useEffect(() => {
    function save(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (changed) {
          setStatus("Settings saved");
          setChanged(0);
        }
      }
    }
    window.addEventListener("keydown", save);
    function focusSearch(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        event.stopImmediatePropagation();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch, true);
    return () => {
      window.removeEventListener("keydown", save);
      window.removeEventListener("keydown", focusSearch, true);
    };
  }, [changed]);

  return (
    <section
      aria-labelledby="settings-command-title"
      className="border-border bg-card mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border shadow-sm"
    >
      <header className="border-border flex flex-wrap items-center justify-between gap-3 border-b p-4 sm:px-5">
        <h2 id="settings-command-title" className="text-base font-medium">
          Settings
        </h2>
        <div className="relative w-full sm:w-56">
          <IconSearch className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search settings"
            aria-label="Search settings"
            className="h-9 pr-12 pl-9"
          />
          <span className="border-border text-muted-foreground pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border px-1.5 py-0.5 text-[10px]">
            ⌘K
          </span>
        </div>
      </header>
      <nav aria-label="Settings sections" className="border-border overflow-x-auto border-b">
        <div role="tablist" className="flex min-w-max gap-1 p-2">
          {sections.map((section, index) => (
            <button
              key={section}
              ref={(node) => {
                tabRefs.current[section] = node ?? undefined;
              }}
              type="button"
              role="tab"
              aria-selected={active === section}
              tabIndex={active === section ? 0 : -1}
              onClick={() => setActive(section)}
              onKeyDown={(event) => moveTab(event, index)}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring relative h-8 rounded-lg px-3 text-sm transition-colors outline-none focus-visible:ring-2"
            >
              {active === section ? (
                <motion.span
                  layoutId="settings-command-tab"
                  className="border-border bg-background absolute inset-0 rounded-lg border shadow-sm"
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative z-10">{section}</span>
            </button>
          ))}
        </div>
      </nav>
      <div className="max-h-[680px] overflow-y-auto p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            role="tabpanel"
            aria-label={active}
          >
            <header className="mb-2">
              <h3 className="text-base font-medium">{active}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {active === "General"
                  ? "Name, address, and regional defaults for Northwind Studio."
                  : `How ${active.toLowerCase()} settings work across your workspace.`}
              </p>
            </header>
            {visibleRows.map(([label, description], index) => (
              <SettingRow
                key={label}
                label={label}
                description={description}
                index={index}
                onChange={() => {
                  setChanged((count) => count + 1);
                  setStatus("Unsaved changes");
                }}
              />
            ))}
            {visibleRows.length === 0 ? (
              <p className="text-muted-foreground py-10 text-center text-sm">No settings match “{query}”.</p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
      <AnimatePresence initial={false}>
        {changed > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            className="border-border bg-muted/20 flex items-center justify-between gap-3 border-t p-3 text-sm"
          >
            <span className="text-muted-foreground">Unsaved changes</span>
            <button
              type="button"
              className="text-primary inline-flex items-center gap-1.5 font-medium hover:underline"
              onClick={() => {
                setChanged(0);
                setStatus("Settings saved");
              }}
            >
              <IconCheck className="size-4" />
              Save
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
