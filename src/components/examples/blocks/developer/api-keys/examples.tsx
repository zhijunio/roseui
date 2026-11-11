"use client";

import * as React from "react";

import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconClock,
  IconCode,
  IconKey,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSend,
  IconShieldCheck,
  IconTrash,
  IconWebhook,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { CopyButton } from "@/components/composite/copy-button";
import { HoldToConfirm } from "@/components/composite/hold-to-confirm";
import { SegmentedControl, SegmentedControlItem } from "@/components/composite/segmented-control";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type ApiKey = {
  id: number;
  name: string;
  prefix: string;
  environment: "Live" | "Test";
  scopes: string[];
  created: string;
  lastUsed: string;
};
const initialKeys: ApiKey[] = [
  {
    id: 1,
    name: "Production app",
    prefix: "sk_live_••••••••4f91",
    environment: "Live",
    scopes: ["Read", "Write"],
    created: "Aug 12, 2026",
    lastUsed: "2 minutes ago",
  },
  {
    id: 2,
    name: "Local development",
    prefix: "sk_test_••••••••9a20",
    environment: "Test",
    scopes: ["Read"],
    created: "Jul 28, 2026",
    lastUsed: "Yesterday",
  },
];
const events = ["invoice.paid", "customer.created", "subscription.updated"];

export function ApiKeysExample() {
  const [keys, setKeys] = React.useState(initialKeys);
  const [creating, setCreating] = React.useState(false);
  const [name, setName] = React.useState("");
  const [environment, setEnvironment] = React.useState("Live");
  const [scope, setScope] = React.useState("Read");
  const [secret, setSecret] = React.useState("");
  const [expanded, setExpanded] = React.useState<number | null>(1);
  const createButtonRef = React.useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (!creating) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCreating(false);
        createButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [creating]);

  function createKey() {
    const nextSecret = `sk_${environment === "Live" ? "live" : "test"}_${Math.random().toString(36).slice(2, 14)}`;
    setSecret(nextSecret);
    setKeys((current) => [
      {
        id: Date.now(),
        name: name || "Untitled key",
        prefix: `${nextSecret.slice(0, 12)}••••••••`,
        environment: environment === "Live" ? "Live" : "Test",
        scopes: scope === "Read" ? ["Read"] : ["Read", "Write"],
        created: "Just now",
        lastUsed: "Never",
      },
      ...current,
    ]);
    setCreating(false);
    setName("");
  }

  return (
    <section className="border-border bg-card mx-auto w-full max-w-4xl rounded-xl border shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <IconKey className="text-muted-foreground size-5" />
            API keys
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Create and manage keys for your applications.</p>
        </div>
        <Button
          ref={createButtonRef}
          onClick={() => {
            setCreating(true);
            setSecret("");
          }}
        >
          <IconPlus />
          Create key
        </Button>
      </header>
      <AnimatePresence initial={false}>
        {creating && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onSubmit={(event) => {
              event.preventDefault();
              createKey();
            }}
            className="bg-muted/20 grid gap-4 overflow-hidden border-b p-5 sm:grid-cols-[1fr_10rem_10rem_auto] sm:items-end sm:p-6"
          >
            <div className="grid gap-1.5">
              <label htmlFor="new-key-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="new-key-name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                placeholder="e.g. Production app"
                autoFocus
                required
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="new-key-env" className="text-sm font-medium">
                Environment
              </label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger id="new-key-env">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="new-key-scope" className="text-sm font-medium">
                Access
              </label>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger id="new-key-scope">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Read">Read only</SelectItem>
                  <SelectItem value="Write">Read and write</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 sm:justify-end">
              <Button type="button" variant="ghost" onClick={() => setCreating(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      {secret && (
        <div className="border-primary/20 bg-primary/5 grid gap-3 border-b p-5 sm:p-6">
          <div>
            <p className="text-sm font-medium">Your new secret is ready</p>
            <p className="text-muted-foreground mt-1 text-xs">Copy it now. For security, it will not be shown again.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <code className="bg-background min-w-0 flex-1 rounded-md border px-3 py-2 text-xs break-all">{secret}</code>
            <CopyButton value={secret} copyLabel="Copy secret" />
          </div>
        </div>
      )}
      <div className="divide-y">
        {keys.map((key) => (
          <div key={key.id} className="p-5 sm:p-6">
            <button
              type="button"
              aria-expanded={expanded === key.id}
              className="flex w-full items-start gap-3 text-left"
              onClick={() => setExpanded(expanded === key.id ? null : key.id)}
            >
              <span className="text-muted-foreground mt-0.5">
                {expanded === key.id ? <IconChevronDown className="size-4" /> : <IconChevronRight className="size-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <strong className="text-sm font-medium">{key.name}</strong>
                  <Badge variant={key.environment === "Live" ? "default" : "secondary"}>{key.environment}</Badge>
                </span>
                <code className="text-muted-foreground mt-1 block truncate text-xs">{key.prefix}</code>
              </span>
              <span className="text-muted-foreground hidden text-xs sm:block">Created {key.created}</span>
            </button>
            {expanded === key.id && (
              <div className="mt-4 ml-7 grid gap-4 border-t pt-4 text-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                <div>
                  <p className="text-muted-foreground text-xs">Scopes</p>
                  <div className="mt-1 flex gap-1">
                    {key.scopes.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Last used</p>
                  <p className="mt-1">{key.lastUsed}</p>
                </div>
                <HoldToConfirm
                  label={
                    <>
                      <IconTrash />
                      Revoke
                    </>
                  }
                  confirmedLabel="Revoked"
                  duration={900}
                  onConfirm={() => setKeys((current) => current.filter((item) => item.id !== key.id))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

type Delivery = {
  id: number;
  event: string;
  status: "Delivered" | "Failed";
  time: string;
  code: string;
};
const initialDeliveries: Delivery[] = [
  {
    id: 1,
    event: "invoice.paid",
    status: "Delivered",
    time: "2 min ago",
    code: "200",
  },
  {
    id: 2,
    event: "customer.created",
    status: "Failed",
    time: "18 min ago",
    code: "500",
  },
  {
    id: 3,
    event: "subscription.updated",
    status: "Delivered",
    time: "1 hour ago",
    code: "200",
  },
];

export function WebhooksExample() {
  const [deliveries, setDeliveries] = React.useState(initialDeliveries);
  const [endpoint, setEndpoint] = React.useState("https://api.northwind.dev/webhooks");
  const [selected, setSelected] = React.useState(1);
  const [tab, setTab] = React.useState("payload");
  const [adding, setAdding] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const deliveryRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const payload = '{\n  "id": "evt_01J8Z",\n  "type": "invoice.paid",\n  "amount": 2400\n}';

  function retry(id: number) {
    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === id ? { ...delivery, status: "Delivered", code: "200", time: "Just now" } : delivery,
      ),
    );
    setStatus("Delivery resolved");
  }
  return (
    <section className="border-border bg-card mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <IconWebhook className="text-muted-foreground size-5" />
            Webhooks
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Inspect events and retry failed deliveries.</p>
        </div>
        <Button onClick={() => setAdding((value) => !value)}>
          <IconPlus />
          Add endpoint
        </Button>
      </header>
      {adding && (
        <form
          className="bg-muted/20 grid gap-3 border-b p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setAdding(false);
            setStatus("Endpoint added");
          }}
        >
          <div className="grid gap-1.5">
            <label htmlFor="webhook-endpoint" className="text-sm font-medium">
              Endpoint URL
            </label>
            <Input
              id="webhook-endpoint"
              value={endpoint}
              onChange={(event) => setEndpoint(event.currentTarget.value)}
            />
          </div>
          <Button type="submit">Save endpoint</Button>
        </form>
      )}
      <div className="grid lg:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.25fr)]">
        <div className="border-b lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-sm font-medium">Recent deliveries</span>
            <Badge variant="secondary">{deliveries.length}</Badge>
          </div>
          <div className="divide-y">
            {deliveries.map((delivery, index) => (
              <button
                key={delivery.id}
                ref={(node) => {
                  deliveryRefs.current[index] = node;
                }}
                type="button"
                aria-current={selected === delivery.id ? "true" : undefined}
                aria-controls="webhook-delivery-detail"
                onClick={() => setSelected(delivery.id)}
                onKeyDown={(event) => {
                  const nextIndex =
                    event.key === "ArrowDown"
                      ? index + 1
                      : event.key === "ArrowUp"
                        ? index - 1
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? deliveries.length - 1
                            : -1;
                  if (nextIndex >= 0 && nextIndex < deliveries.length) {
                    event.preventDefault();
                    setSelected(deliveries[nextIndex].id);
                    deliveryRefs.current[nextIndex]?.focus();
                  }
                }}
                className="hover:bg-muted/50 aria-[current=true]:bg-muted/70 flex w-full items-center gap-3 p-4 text-left transition-colors"
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${delivery.status === "Delivered" ? "bg-success" : "bg-destructive"}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{delivery.event}</span>
                  <span className="text-muted-foreground mt-1 block text-xs">{delivery.time}</span>
                </span>
                <Badge variant={delivery.status === "Delivered" ? "secondary" : "destructive"}>{delivery.code}</Badge>
              </button>
            ))}
          </div>
        </div>
        <section id="webhook-delivery-detail" aria-live="polite" className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">
                {deliveries.find((delivery) => delivery.id === selected)?.event ?? "Delivery"}
              </p>
              <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                <IconClock className="size-3.5" />
                Received 2 minutes ago
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => retry(selected)}>
              <IconRefresh />
              Retry
            </Button>
          </div>
          <Tabs value={tab} onValueChange={setTab} className="mt-5">
            <TabsList variant="line">
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
            <TabsContent value="payload" className="mt-4">
              <pre className="bg-muted/30 max-h-64 overflow-auto rounded-lg border p-4 text-xs leading-6">
                <code>{payload}</code>
              </pre>
            </TabsContent>
            <TabsContent value="headers" className="mt-4">
              <pre className="bg-muted/30 rounded-lg border p-4 text-xs leading-6">
                content-type: application/json{"\n"}x-signature: sha256=••••••••
              </pre>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}

const settingRows = [
  {
    id: "dark-mode",
    label: "Dark mode",
    description: "Use a darker color scheme across the workspace.",
    kind: "switch",
  },
  {
    id: "compact",
    label: "Compact density",
    description: "Show more rows and less spacing in tables.",
    kind: "switch",
  },
  {
    id: "language",
    label: "Language",
    description: "Choose the language used in navigation and system messages.",
    kind: "select",
  },
  {
    id: "timezone",
    label: "Time zone",
    description: "Used to display dates and schedule notifications.",
    kind: "select",
  },
] as const;

export function SettingsCommandExample() {
  const [values, setValues] = React.useState({
    "dark-mode": false,
    compact: true,
    language: "English",
    timezone: "Shanghai",
  });
  const [savedValues, setSavedValues] = React.useState(values);
  const [query, setQuery] = React.useState("");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [paletteIndex, setPaletteIndex] = React.useState(0);
  const [dirty, setDirty] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchButtonRef = React.useRef<HTMLButtonElement>(null);
  const paletteRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const filtered = settingRows.filter((row) =>
    `${row.label} ${row.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const openPalette = React.useCallback(() => {
    setPaletteOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);
  const closePalette = React.useCallback(() => {
    setPaletteOpen(false);
    window.setTimeout(() => searchButtonRef.current?.focus(), 0);
  }, []);
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") || event.key === "/") {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
        event.preventDefault();
        openPalette();
      }
      if (event.key === "Escape") closePalette();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette, closePalette]);
  function jumpToSetting(id: string) {
    closePalette();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function update(key: keyof typeof values, value: boolean | string) {
    setValues((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setSaved(false);
  }
  function trapPaletteFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      paletteRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex="0"]',
      ) ?? [],
    );
    const first = focusable.at(0);
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <section className="border-border bg-card relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Workspace settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Find a setting or update preferences below.</p>
        </div>
        <button
          ref={searchButtonRef}
          type="button"
          onClick={openPalette}
          className="bg-background text-muted-foreground hover:border-ring flex h-9 w-full items-center gap-2 rounded-md border px-3 text-left text-sm transition-colors sm:w-56"
        >
          <IconSearch className="size-4" />
          Search settings
          <KbdGroup className="ml-auto">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </button>
      </header>
      <div className="divide-y">
        {settingRows.map((row) => (
          <div key={row.id} id={row.id} className="flex flex-wrap items-center justify-between gap-5 p-5 sm:p-6">
            <div className="min-w-0">
              <p className="text-sm font-medium">{row.label}</p>
              <p className="text-muted-foreground mt-1 text-sm">{row.description}</p>
            </div>
            {row.kind === "switch" ? (
              <Switch
                checked={values[row.id as "dark-mode" | "compact"]}
                onCheckedChange={(value) => update(row.id as "dark-mode" | "compact", value)}
                aria-label={row.label}
              />
            ) : (
              <Select
                value={values[row.id as "language" | "timezone"]}
                onValueChange={(value) => update(row.id as "language" | "timezone", value)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={row.id === "language" ? "English" : "Shanghai"}>
                    {row.id === "language" ? "English" : "Shanghai"}
                  </SelectItem>
                  <SelectItem value={row.id === "language" ? "简体中文" : "Lisbon"}>
                    {row.id === "language" ? "简体中文" : "Lisbon"}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {dirty && (
          <motion.div
            initial={{ y: reduced ? 0 : 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduced ? 0 : 8, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
            className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 border-t p-3 sm:px-5"
          >
            <span className="text-sm">
              <strong>Unsaved changes</strong>
              <span className="text-muted-foreground ml-2 max-sm:hidden">Your preferences have not been saved.</span>
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setValues(savedValues);
                  setDirty(false);
                  setSaved(false);
                }}
              >
                Discard
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSavedValues(values);
                  setDirty(false);
                  setSaved(true);
                }}
              >
                <IconCheck />
                Save changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {saved && (
        <p className="sr-only" role="status" aria-live="polite">
          Settings saved
        </p>
      )}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.14 }}
            className="bg-background/80 absolute inset-0 z-10 p-4 backdrop-blur-sm sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePalette();
            }}
          >
            <div
              ref={paletteRef}
              role="dialog"
              aria-modal="true"
              aria-label="Search settings"
              className="bg-card mx-auto max-w-lg overflow-hidden rounded-xl border shadow-xl"
              onKeyDown={trapPaletteFocus}
            >
              <div className="flex items-center gap-2 border-b px-4">
                <IconSearch className="text-muted-foreground size-4" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.currentTarget.value);
                    setPaletteIndex(0);
                  }}
                  onKeyDown={(event) => {
                    if (!filtered.length) return;
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setPaletteIndex((index) => (index + 1) % filtered.length);
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setPaletteIndex((index) => (index - 1 + filtered.length) % filtered.length);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      setPaletteIndex(0);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      setPaletteIndex(filtered.length - 1);
                    } else if (event.key === "Enter") {
                      event.preventDefault();
                      jumpToSetting(filtered[paletteIndex].id);
                    }
                  }}
                  aria-activedescendant={
                    filtered[paletteIndex] ? `setting-result-${filtered[paletteIndex].id}` : undefined
                  }
                  role="combobox"
                  aria-controls="settings-results"
                  aria-expanded="true"
                  placeholder="Search settings..."
                  className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                <Kbd>Esc</Kbd>
              </div>
              <div id="settings-results" role="listbox" className="max-h-72 overflow-y-auto p-2">
                {filtered.length ? (
                  filtered.map((row, index) => (
                    <button
                      key={row.id}
                      id={`setting-result-${row.id}`}
                      type="button"
                      role="option"
                      aria-selected={index === paletteIndex}
                      className={`hover:bg-muted flex w-full items-start gap-3 rounded-lg p-3 text-left ${index === paletteIndex ? "bg-muted" : ""}`}
                      onClick={() => jumpToSetting(row.id)}
                    >
                      <span className="bg-muted grid size-8 place-items-center rounded-md">
                        <IconSettingsGlyph kind={row.kind} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">{row.label}</span>
                        <span className="text-muted-foreground mt-1 block text-xs">{row.description}</span>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-muted-foreground p-5 text-center text-sm">No settings found.</p>
                )}
              </div>
              <div className="text-muted-foreground flex items-center justify-between border-t px-4 py-2 text-xs">
                <span>Navigate with arrows</span>
                <span>
                  <Kbd>Esc</Kbd> to close
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function IconSettingsGlyph({ kind }: { kind: "switch" | "select" }) {
  return kind === "switch" ? (
    <IconShieldCheck className="text-muted-foreground size-4" />
  ) : (
    <IconCode className="text-muted-foreground size-4" />
  );
}

export function WebhookTesterExample() {
  const [event, setEvent] = React.useState(events[0]);
  const [payload, setPayload] = React.useState('{\n  "id": "evt_01J8Z",\n  "amount": 2400\n}');
  const [secretVisible, setSecretVisible] = React.useState(false);
  const [stage, setStage] = React.useState<"idle" | "signing" | "sent" | "complete">("idle");
  const [responseTab, setResponseTab] = React.useState("response");
  const reduced = useReducedMotion();
  const payloadError = React.useMemo(() => {
    try {
      JSON.parse(payload);
      return "";
    } catch {
      return "JSON must be valid before sending.";
    }
  }, [payload]);
  const send = React.useCallback(() => {
    if (payloadError) return;
    setStage("signing");
    window.setTimeout(() => setStage("sent"), reduced ? 0 : 300);
    window.setTimeout(() => setStage("complete"), reduced ? 0 : 900);
  }, [payloadError, reduced]);
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        send();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [send]);
  const stageIndex = { idle: 0, signing: 1, sent: 2, complete: 3 }[stage];
  return (
    <section className="border-border bg-card mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-sm">
      <header className="border-b p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <IconSend className="text-muted-foreground size-5" />
          Webhook tester
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Send a signed test event to your endpoint and inspect the response.
        </p>
      </header>
      <div className="grid lg:grid-cols-2">
        <div className="grid gap-4 border-b p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-1.5">
            <label htmlFor="tester-endpoint" className="text-sm font-medium">
              Endpoint
            </label>
            <Input id="tester-endpoint" defaultValue="https://api.northwind.dev/webhooks/stripe" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="tester-event" className="text-sm font-medium">
              Event type
            </label>
            <Select
              value={event}
              onValueChange={(value) => {
                setEvent(value);
                setPayload(JSON.stringify({ id: "evt_01J8Z", type: value, amount: 2400 }, null, 2));
                setStage("idle");
              }}
            >
              <SelectTrigger id="tester-event">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {events.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="tester-secret" className="text-sm font-medium">
              Signing secret
            </label>
            <div className="flex gap-2">
              <Input
                id="tester-secret"
                type={secretVisible ? "text" : "password"}
                value="whsec_northwind_demo"
                readOnly
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setSecretVisible((value) => !value)}
                aria-pressed={secretVisible}
              >
                {secretVisible ? "Hide" : "Reveal"}
              </Button>
            </div>
          </div>
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="tester-payload" className="text-sm font-medium">
                JSON payload
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPayload(JSON.stringify({ id: "evt_01J8Z", type: event, amount: 2400 }, null, 2))}
              >
                Format
              </Button>
            </div>
            <Textarea
              id="tester-payload"
              value={payload}
              onChange={(event) => setPayload(event.currentTarget.value)}
              aria-invalid={Boolean(payloadError)}
              aria-describedby={payloadError ? "tester-payload-error" : undefined}
              rows={8}
              className="font-mono text-xs"
            />
            {payloadError && (
              <p id="tester-payload-error" role="alert" className="text-destructive text-xs">
                {payloadError}
              </p>
            )}
          </div>
          <Button
            type="button"
            onClick={send}
            disabled={Boolean(payloadError) || stage === "signing" || stage === "sent"}
          >
            <IconSend />
            {stage === "signing" || stage === "sent" ? "Sending..." : "Send test event"}
            <Kbd className="bg-primary-foreground/15 text-primary-foreground ml-auto">⌘↵</Kbd>
          </Button>
        </div>
        <div className="grid content-start gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Request timeline</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {stage === "complete"
                  ? "Delivered in 184 ms"
                  : stage === "signing"
                    ? "Signing request..."
                    : stage === "sent"
                      ? "Waiting for response..."
                      : "Ready to send"}
              </p>
            </div>
            {stage === "complete" ? (
              <Badge>
                <IconCheck />
                200 OK
              </Badge>
            ) : (
              <Badge variant="secondary">Waiting</Badge>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 1 ? 1 : 0.7,
                y: stageIndex >= 1 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 1 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconShieldCheck className="size-4" />
              </span>
              <span>Signed</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 2 ? 1 : 0.7,
                y: stageIndex >= 2 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 2 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconSend className="size-4" />
              </span>
              <span>Sent</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 3 ? 1 : 0.7,
                y: stageIndex >= 3 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 3 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconCheck className="size-4" />
              </span>
              <span>200 OK</span>
            </motion.div>
          </div>
          <Tabs value={responseTab} onValueChange={setResponseTab}>
            <TabsList>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
            </TabsList>
            <TabsContent value="response" className="mt-3">
              <pre className="bg-muted/30 min-h-32 overflow-auto rounded-lg border p-4 text-xs leading-6">
                {stage === "complete"
                  ? `{\n  "received": true,\n  "event": "${event}"\n}`
                  : "Send an event to see the response."}
              </pre>
            </TabsContent>
            <TabsContent value="request" className="mt-3">
              <pre className="bg-muted/30 min-h-32 overflow-auto rounded-lg border p-4 text-xs leading-6">
                POST /webhooks/stripe
                {stage === "complete" ? "\nstripe-signature: t=...,v1=..." : ""}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

type EnvironmentName = "Development" | "Preview" | "Production";
type EnvironmentVariable = {
  key: string;
  value: string;
  sensitive: boolean;
  description: string;
};

const environmentVariables: Record<EnvironmentName, EnvironmentVariable[]> = {
  Development: [
    {
      key: "NEXT_PUBLIC_APP_URL",
      value: "http://localhost:3000",
      sensitive: false,
      description: "Public app URL",
    },
    {
      key: "DATABASE_URL",
      value: "postgres://dev••••••",
      sensitive: true,
      description: "Primary database connection",
    },
    {
      key: "STRIPE_SECRET_KEY",
      value: "sk_test_••••••••",
      sensitive: true,
      description: "Test payments secret",
    },
  ],
  Preview: [
    {
      key: "NEXT_PUBLIC_APP_URL",
      value: "https://preview.northwind.dev",
      sensitive: false,
      description: "Preview app URL",
    },
    {
      key: "DATABASE_URL",
      value: "postgres://preview••••",
      sensitive: true,
      description: "Preview database connection",
    },
    {
      key: "STRIPE_SECRET_KEY",
      value: "sk_test_••••••••",
      sensitive: true,
      description: "Test payments secret",
    },
  ],
  Production: [
    {
      key: "NEXT_PUBLIC_APP_URL",
      value: "https://app.northwind.dev",
      sensitive: false,
      description: "Production app URL",
    },
    {
      key: "DATABASE_URL",
      value: "postgres://production••••",
      sensitive: true,
      description: "Primary database connection",
    },
    {
      key: "STRIPE_SECRET_KEY",
      value: "sk_live_••••••••",
      sensitive: true,
      description: "Live payments secret",
    },
  ],
};

export function EnvironmentVariablesExample() {
  const [environment, setEnvironment] = React.useState<EnvironmentName>("Production");
  const [query, setQuery] = React.useState("");
  const [dotenv, setDotenv] = React.useState("");
  const [imported, setImported] = React.useState(false);
  const [redeploying, setRedeploying] = React.useState(false);
  const [redeployed, setRedeployed] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);
  const reduced = useReducedMotion();
  const variables = environmentVariables[environment].filter((item) =>
    `${item.key} ${item.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const importLines = dotenv
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const invalidLines = importLines.filter((line) => !/^[A-Z][A-Z0-9_]*=/.test(line));
  const duplicateLines = importLines.filter(
    (line, index) => importLines.findIndex((candidate) => candidate.split("=")[0] === line.split("=")[0]) !== index,
  );

  function importVariables() {
    setImported(true);
    setDirty(true);
  }

  function redeploy() {
    setRedeploying(true);
    setRedeployed(false);
    window.setTimeout(
      () => {
        setRedeploying(false);
        setRedeployed(true);
        setDirty(false);
      },
      reduced ? 0 : 800,
    );
  }

  return (
    <section className="border-border bg-card mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <IconCode className="text-muted-foreground size-5" />
            Environment variables
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage configuration and secrets for each deployment environment.
          </p>
        </div>
        <Badge variant={redeployed ? "default" : "secondary"}>{redeployed ? "Redeployed" : "Northwind app"}</Badge>
      </header>
      <div className="grid gap-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SegmentedControl
            value={environment}
            onValueChange={(value) => {
              if (value === "Development" || value === "Preview" || value === "Production") {
                setEnvironment(value);
                setRedeployed(false);
              }
            }}
            aria-label="Deployment environment"
            size="sm"
          >
            <SegmentedControlItem value="Development">Development</SegmentedControlItem>
            <SegmentedControlItem value="Preview">Preview</SegmentedControlItem>
            <SegmentedControlItem value="Production">Production</SegmentedControlItem>
          </SegmentedControl>
          <div className="relative w-full sm:w-56">
            <IconSearch className="text-muted-foreground pointer-events-none absolute top-2.5 left-2.5 size-4" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search variables"
              aria-label="Search environment variables"
              className="pl-8"
            />
          </div>
        </div>
        <div className="divide-y rounded-lg border">
          <AnimatePresence initial={false} mode="popLayout">
            {variables.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: reduced ? 0 : 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.16 }}
                className="flex flex-wrap items-center gap-4 p-4"
              >
                <div className="min-w-0 flex-1">
                  <code className="text-sm font-medium">{item.key}</code>
                  <p className="text-muted-foreground mt-1 text-xs">{item.description}</p>
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <code className="bg-muted max-w-52 truncate rounded-md px-2 py-1 text-xs">{item.value}</code>
                  <CopyButton value={item.value} iconOnly aria-label={`Copy ${item.key}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!variables.length && <p className="text-muted-foreground p-6 text-center text-sm">No variables found.</p>}
        </div>
        <div className="grid gap-3 border-t pt-5">
          <div>
            <p className="text-sm font-medium">Import from .env</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Paste one variable per line. Sensitive values are write-only after import.
            </p>
          </div>
          <Textarea
            value={dotenv}
            onChange={(event) => {
              setDotenv(event.currentTarget.value);
              setImported(false);
              setDirty(true);
            }}
            placeholder={"DATABASE_URL=postgres://...\nSTRIPE_SECRET_KEY=sk_live_..."}
            rows={3}
            className="font-mono text-xs"
          />
          {(invalidLines.length > 0 || duplicateLines.length > 0) && (
            <p role="alert" className="text-destructive text-xs">
              {invalidLines.length > 0
                ? `${invalidLines.length} invalid line${invalidLines.length === 1 ? "" : "s"}. `
                : ""}
              {duplicateLines.length > 0 ? "Duplicate keys will use the last value." : ""}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-muted-foreground min-h-5 text-xs" role="status" aria-live="polite">
              {imported ? "Variables imported into this draft." : ""}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!dotenv.trim() || invalidLines.length > 0}
              onClick={importVariables}
            >
              Import variables
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {dirty && (
          <motion.div
            initial={{ y: reduced ? 0 : 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduced ? 0 : 8, opacity: 0 }}
            className="bg-muted/40 flex flex-wrap items-center justify-between gap-3 border-t p-3 sm:px-6"
          >
            <span className="text-sm">
              <strong>Unsaved changes</strong>
              <span className="text-muted-foreground ml-2 max-sm:hidden">Redeploy to apply them.</span>
            </span>
            <Button size="sm" onClick={redeploy} disabled={redeploying}>
              {redeploying ? "Redeploying..." : "Redeploy"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
