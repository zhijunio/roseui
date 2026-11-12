"use client";

import * as React from "react";

import { IconChevronDown, IconChevronRight, IconKey, IconPlus, IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { HoldToConfirm } from "@/components/ui/hold-to-confirm";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
