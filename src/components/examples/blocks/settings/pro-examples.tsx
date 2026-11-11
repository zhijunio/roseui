"use client";

import { useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const panel = "mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm";
const chartBars = Array.from({ length: 24 }, (_, index) => ({ id: `bar-${index + 1}`, offset: index }));

export function UsageBillingExample() {
  const [upgrade, setUpgrade] = useState(false);
  const [alert, setAlert] = useState(true);
  const reduced = useReducedMotion();
  const meters = [
    ["API requests", 84, "8.42M of 10M", "Projected 10.53M, 5% over"],
    ["Bandwidth", 92, "1.84 TB of 2 TB", "Projected 2.3 TB, 15% over"],
    ["Build minutes", 52, "3,120 min of 6,000 min", "Projected 3,900 min"],
  ] as const;
  return (
    <section className={panel} aria-labelledby="usage-billing-title">
      <header className="border-border border-b p-5 sm:p-6">
        <h2 id="usage-billing-title" className="text-base font-medium">
          Usage and billing
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">Sep 1 to Sep 30 · day 24 of 30</p>
      </header>
      <div className="grid gap-4 p-5 sm:p-6">
        <div className="bg-muted/30 rounded-xl p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Spend so far</p>
              <p className="mt-1 text-2xl font-semibold">$1,184.80</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Projected</p>
              <p className="mt-1 text-lg font-medium">$1,538.29</p>
            </div>
          </div>
          <div className="mt-5 flex h-24 items-end gap-1">
            {chartBars.map((bar) => (
              <motion.span
                key={bar.id}
                initial={{ height: reduced ? `${35 + (bar.offset % 5) * 9}%` : "0%" }}
                animate={{ height: `${35 + (bar.offset % 5) * 9}%` }}
                transition={reduced ? { duration: 0 } : { duration: 0.35, delay: bar.offset * 0.02 }}
                className="bg-primary/70 flex-1 rounded-t-sm"
              />
            ))}
          </div>
          <p className="text-muted-foreground mt-3 text-xs">On pace to reach your $1,500 alert around Sep 30</p>
        </div>
        <div className="border-border/70 flex items-center justify-between gap-3 border-b py-4">
          <div>
            <p className="text-sm font-medium">Plan</p>
            <p className="text-muted-foreground mt-1 text-sm">Pro · $249 a month · Renews Oct 1</p>
          </div>
          <Button size="sm" onClick={() => setUpgrade(true)}>
            Upgrade to Scale
          </Button>
        </div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Usage</p>
            <span className="text-muted-foreground text-xs">Resets Oct 1</span>
          </div>
          {meters.map(([label, value, detail, projected]) => (
            <div key={label} className="border-border/70 grid gap-2 border-b py-4 last:border-0">
              <div className="flex justify-between gap-3 text-sm">
                <span>{label}</span>
                <span className="text-muted-foreground">{detail}</span>
              </div>
              <div className="bg-muted h-2 rounded-full">
                <motion.div
                  initial={{ width: reduced ? `${value}%` : "0%" }}
                  animate={{ width: `${value}%` }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5 }}
                  className="bg-primary h-full rounded-full"
                />
              </div>
              <span className="text-muted-foreground text-xs">{projected}</span>
            </div>
          ))}
        </div>
        <div className="border-border/70 flex items-center justify-between gap-3 border-t pt-4">
          <div>
            <p className="text-sm font-medium">Spend alerts</p>
            <p className="text-muted-foreground mt-1 text-xs">Email admins at 75% of budget.</p>
          </div>
          <Switch checked={alert} onCheckedChange={setAlert} aria-label="Spend alerts" />
        </div>
      </div>
      <AnimatePresence>
        {upgrade ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="border-border bg-muted/20 border-t p-5 text-sm"
          >
            <p className="font-medium">Upgrade to Scale?</p>
            <p className="text-muted-foreground mt-1">Scale gives you room on API requests and bandwidth.</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={() => setUpgrade(false)}>
                Confirm upgrade
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setUpgrade(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export function CancelFlowExample() {
  const [step, setStep] = useState<"reason" | "confirm" | "done">("reason");
  const [reason, setReason] = useState("");
  const reasons = ["Too expensive", "Missing a feature", "Not using it enough", "Other"];
  return (
    <section className={panel} aria-labelledby="cancel-flow-title">
      <header className="border-border border-b p-5 sm:p-6">
        <h2 id="cancel-flow-title" className="text-base font-medium">
          Cancel subscription
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">We will keep your workspace available until Oct 14.</p>
      </header>
      <div className="p-5 sm:p-6">
        {step === "done" ? (
          <div className="py-8 text-center">
            <p className="text-base font-medium">Cancellation scheduled</p>
            <p className="text-muted-foreground mt-1 text-sm">Your plan remains active through the current period.</p>
          </div>
        ) : step === "reason" ? (
          <div className="grid gap-4">
            <p className="text-sm font-medium">What is prompting you to leave?</p>
            {reasons.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setReason(item)}
                className={`hover:bg-muted rounded-lg border p-3 text-left text-sm transition-colors${reason === item ? "border-primary bg-primary/5" : "border-border"}`}
              >
                {item}
              </button>
            ))}
            <Button disabled={!reason} className="mt-2 w-fit" onClick={() => setStep("confirm")}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div>
              <p className="text-sm font-medium">Confirm cancellation</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Reason: {reason}. You will not be charged after Oct 14.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => setStep("done")}>
                Cancel subscription
              </Button>
              <Button variant="ghost" onClick={() => setStep("reason")}>
                Go back
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function OnboardingSurveyExample() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const questions = [
    ["What are you here to do?", ["Manage a team", "Ship a product", "Explore the workspace"]],
    ["How large is your team?", ["Just me", "2–10 people", "11–50 people"]],
  ] as const;
  const current = questions[step];
  return (
    <section className={panel} aria-labelledby="onboarding-survey-title">
      <header className="border-border border-b p-5 sm:p-6">
        <p className="text-muted-foreground text-xs">
          Step {step + 1} of {questions.length}
        </p>
        <h2 id="onboarding-survey-title" className="mt-1 text-base font-medium">
          {current[0]}
        </h2>
      </header>
      <div className="grid gap-3 p-5 sm:p-6">
        {current[1].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setAnswer(item)}
            className={`hover:bg-muted rounded-lg border p-3 text-left text-sm${answer === item ? "border-primary bg-primary/5" : "border-border"}`}
          >
            {item}
          </button>
        ))}
        <Button
          className="mt-2 w-fit"
          disabled={!answer}
          onClick={() => {
            setAnswer("");
            setStep((value) => Math.min(value + 1, questions.length - 1));
          }}
        >
          {step === questions.length - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </section>
  );
}

export function SpendAlertExample() {
  const [threshold, setThreshold] = useState("1500");
  const [saved, setSaved] = useState(false);
  return (
    <section className={panel} aria-labelledby="spend-alert-title">
      <header className="border-border border-b p-5 sm:p-6">
        <h2 id="spend-alert-title" className="text-base font-medium">
          Spend alerts
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">Notify your team before usage becomes a surprise.</p>
      </header>
      <div className="grid gap-5 p-5 sm:p-6">
        <label className="grid gap-1.5 text-sm font-medium" htmlFor="spend-threshold">
          Alert amount in dollars
          <Input
            id="spend-threshold"
            value={threshold}
            inputMode="decimal"
            onChange={(event) => {
              setThreshold(event.currentTarget.value);
              setSaved(false);
            }}
          />
        </label>
        <div className="border-border flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Monthly budget alert</p>
            <p className="text-muted-foreground mt-1 text-xs">Email admins at 75% of the budget.</p>
          </div>
          <Badge variant="success-light">Active</Badge>
        </div>
        <Button className="w-fit" onClick={() => setSaved(true)}>
          {saved ? "Alert saved" : "Add alert"}
        </Button>
      </div>
    </section>
  );
}
