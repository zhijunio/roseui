"use client";

import { useState } from "react";

import { IconDownload, IconPencil, IconReceipt, IconSparkles } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InvoiceStatus = "Paid" | "Failed" | "Due";
const invoices: Array<{ title: string; detail: string; amount: string; date: string; status: InvoiceStatus }> = [
  { title: "Growth plan", detail: "Sep 14 – Oct 13", amount: "$199.00", date: "Sep 14, 2026", status: "Paid" },
  {
    title: "Log retention add-on",
    detail: "Card declined by the bank",
    amount: "$36.00",
    date: "Sep 3, 2026",
    status: "Failed",
  },
  {
    title: "Onboarding workshop",
    detail: "Bank transfer, due Sep 27",
    amount: "$600.00",
    date: "Aug 28, 2026",
    status: "Due",
  },
  { title: "Growth plan", detail: "Aug 14 – Sep 13", amount: "$199.00", date: "Aug 14, 2026", status: "Paid" },
];

function UsageRow({
  label,
  value,
  used,
  limit,
  detail,
  warning = false,
}: {
  label: string;
  value: number;
  used: string;
  limit: string;
  detail: string;
  warning?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="border-border/70 grid gap-2 border-b py-4 last:border-b-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {warning ? (
          <Badge variant="warning-light" size="sm">
            Near limit
          </Badge>
        ) : null}
      </div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span>
          <strong>{used}</strong> of {limit}
        </span>
        <span className="text-muted-foreground text-xs">{detail}</span>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: reduced ? `${value}%` : "0%" }}
          animate={{ width: `${value}%` }}
          transition={reduced ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${warning ? "bg-warning" : "bg-primary"}`}
        />
      </div>
    </div>
  );
}

export function BillingOverview() {
  const [editingCard, setEditingCard] = useState(false);
  const [cardLastFour, setCardLastFour] = useState("7719");
  const [status, setStatus] = useState("");
  const reduced = useReducedMotion();
  return (
    <section aria-labelledby="billing-title" className="mx-auto grid w-full max-w-2xl gap-4">
      <header className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6">
        <h2 id="billing-title" className="text-base font-medium">
          Billing
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">Fieldnote Labs workspace</p>
      </header>
      <section
        className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm"
        aria-labelledby="plan-title"
      >
        <div className="border-border flex items-start justify-between gap-4 border-b p-5 sm:p-6">
          <div>
            <p className="text-muted-foreground text-sm">Current plan</p>
            <h3 id="plan-title" className="mt-1 text-base font-medium">
              Growth
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">Billed monthly</p>
          </div>
          <Button size="sm" onClick={() => setStatus("Upgrade flow opened")}>
            <IconSparkles className="size-4" />
            Upgrade
          </Button>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
          <div>
            <p className="text-3xl font-semibold tracking-tight">$199</p>
            <p className="text-muted-foreground mt-1 text-sm">/ month</p>
            <p className="text-muted-foreground mt-3 text-sm">Renews Oct 14, 2026</p>
            <p className="text-muted-foreground mt-1 text-sm">15 seats · 1M API calls · 100 GB</p>
          </div>
          <div className="bg-foreground text-background rounded-xl p-4 sm:w-44">
            <p className="text-background/70 text-xs">Growth</p>
            <p className="mt-5 text-sm font-medium">Fieldnote Labs</p>
            <p className="text-background/70 mt-3 text-xs tracking-[0.2em]">•••• 7719</p>
            <p className="text-background/60 mt-3 text-[10px]">04/28</p>
          </div>
        </div>
      </section>
      <section
        className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6"
        aria-labelledby="payment-title"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 id="payment-title" className="text-sm font-medium">
              Payment method
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">Business · Fieldnote Labs</p>
          </div>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Edit payment method"
            onClick={() => setEditingCard((value) => !value)}
          >
            <IconPencil className="size-4" />
          </Button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {editingCard ? (
            <motion.div
              key="edit"
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -4 }}
              className="mt-4 flex flex-wrap items-end gap-3"
            >
              <label htmlFor="billing-card" className="grid min-w-40 flex-1 gap-1.5 text-sm font-medium">
                Card ending
                <Input
                  id="billing-card"
                  value={cardLastFour}
                  maxLength={4}
                  inputMode="numeric"
                  onChange={(event) => setCardLastFour(event.currentTarget.value.replace(/\D/g, "").slice(0, 4))}
                />
              </label>
              <Button
                size="sm"
                onClick={() => {
                  setEditingCard(false);
                  setStatus(`Card ending ${cardLastFour} updated`);
                }}
              >
                Update
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-foreground text-background mt-4 flex items-center justify-between rounded-xl p-4"
            >
              <span className="text-sm">•••• {cardLastFour}</span>
              <span className="text-background/70 text-xs">04 / 28</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="border-border bg-card rounded-2xl border p-5 shadow-sm sm:p-6" aria-labelledby="usage-title">
        <div className="flex items-center justify-between gap-3">
          <h3 id="usage-title" className="text-sm font-medium">
            Usage this period
          </h3>
          <span className="text-muted-foreground text-xs">Sep 14 – Oct 13</span>
        </div>
        <div className="mt-2">
          <UsageRow label="Seats" value={80} used="12" limit="15" detail="80% used · 3 seats left" />
          <UsageRow
            label="API calls"
            value={91}
            used="912,480"
            limit="1M"
            detail="91% used · 87,520 calls left"
            warning
          />
          <UsageRow label="Storage" value={38} used="38.4 GB" limit="100 GB" detail="38% used · 61.6 GB left" />
        </div>
      </section>
      <section
        className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm"
        aria-labelledby="invoices-title"
      >
        <div className="border-border flex items-center justify-between gap-3 border-b p-5 sm:p-6">
          <div>
            <h3 id="invoices-title" className="text-sm font-medium">
              Invoices
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">Sent to Emma Carter</p>
          </div>
          <span className="text-muted-foreground text-xs">Growth plan</span>
        </div>
        <div className="divide-border divide-y">
          {invoices.map((invoice, index) => (
            <div
              key={`${invoice.title}-${invoice.date}`}
              className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:p-5"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="bg-muted grid size-8 shrink-0 place-items-center rounded-md">
                  <IconReceipt className="text-muted-foreground size-4" />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-medium">{invoice.title}</strong>
                  <span className="text-muted-foreground block truncate text-xs">{invoice.detail}</span>
                </span>
              </span>
              <span className="text-sm font-medium sm:text-right">
                {invoice.amount}
                <span className="text-muted-foreground ml-2 text-xs font-normal">{invoice.date}</span>
              </span>
              <span className="flex items-center justify-between gap-2 sm:justify-end">
                <Badge
                  variant={
                    invoice.status === "Paid"
                      ? "success-light"
                      : invoice.status === "Failed"
                        ? "destructive-light"
                        : "warning-light"
                  }
                >
                  {invoice.status}
                </Badge>
                {invoice.status === "Failed" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setStatus(`Payment for invoice ${index + 1} opened`)}
                  >
                    Pay now
                  </Button>
                ) : (
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Download invoice ${index + 1}`}
                    onClick={() => setStatus(`Invoice ${index + 1} download started`)}
                  >
                    <IconDownload className="size-4" />
                  </Button>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </section>
  );
}
