"use client";

import * as React from "react";

import { IconCode, IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Input } from "@/components/ui/input";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Textarea } from "@/components/ui/textarea";

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
