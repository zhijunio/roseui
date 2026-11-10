"use client";

import * as React from "react";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/composite/stepper";

const steps = [
  { title: "Workspace", description: "Name your workspace" },
  { title: "Preferences", description: "Set your defaults" },
  { title: "Review", description: "Confirm details" },
] as const;

export function MultiStepFormExample() {
  const [step, setStep] = React.useState(1);
  const [workspace, setWorkspace] = React.useState("Northwind Studio");
  const [role, setRole] = React.useState("admin");
  const [updates, setUpdates] = React.useState(true);
  const [complete, setComplete] = React.useState(false);
  const currentStep = steps[step - 1] ?? steps[0];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="flex items-end justify-between gap-4 rounded-xl border bg-muted/20 px-4 py-3.5">
        <div><p className="text-sm font-semibold tracking-tight">Workspace setup</p><p aria-live="polite" className="mt-1 text-xs text-muted-foreground">Step {step} of {steps.length}: {currentStep.description}</p></div>
        <span className="rounded-full border bg-background px-2.5 py-1 text-xs font-semibold tabular-nums text-muted-foreground">{Math.round((step / steps.length) * 100)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true"><div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(step / steps.length) * 100}%` }} /></div>
      <Stepper value={step} onValueChange={(next) => { if (next <= step + 1) setStep(next); }}>
        <StepperNav aria-label="Workspace setup steps" className="items-start gap-2 rounded-xl border bg-muted/30 p-2.5 sm:gap-3 sm:p-3">
          {steps.map((item, index) => (
            <React.Fragment key={item.title}>
              <StepperItem step={index + 1} completed={index + 1 < step} disabled={index + 1 > step + 1}>
                <StepperTrigger aria-label={`${item.title}: ${item.description}`} className="items-start rounded-lg p-1.5 transition-colors group-data-[state=active]/step:bg-background group-data-[state=active]/step:shadow-sm">
                  <StepperIndicator>{index + 1}</StepperIndicator>
                  <span className="hidden min-w-0 text-left sm:block"><StepperTitle>{item.title}</StepperTitle><StepperDescription>{item.description}</StepperDescription></span>
                </StepperTrigger>
              </StepperItem>
              {index < steps.length - 1 && <StepperSeparator />}
            </React.Fragment>
          ))}
        </StepperNav>
      </Stepper>

      {complete ? (
        <div className="grid justify-items-center gap-3 rounded-xl border bg-muted/20 p-8 text-center shadow-sm">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"><IconCheck aria-hidden="true" className="size-5" /></span>
          <h2 className="text-lg font-semibold tracking-tight">Workspace ready</h2>
          <p className="text-sm text-muted-foreground">Your setup choices have been saved for this demo.</p>
          <Button type="button" variant="outline" onClick={() => { setComplete(false); setStep(1); }}>Start again</Button>
        </div>
      ) : (
        <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); if (step < steps.length) setStep(step + 1); else setComplete(true); }}>
          {step === 1 && <div className="grid gap-4 rounded-xl border bg-background p-4 sm:p-5"><div><h2 className="text-base font-semibold">Name your workspace</h2><p className="mt-1 text-sm text-muted-foreground">Give your team a clear place to start working together.</p></div><div className="grid gap-4"><div className="grid gap-2"><Label htmlFor="workspace-name">Workspace name</Label><Input id="workspace-name" value={workspace} onChange={(event) => setWorkspace(event.currentTarget.value)} required /></div><div className="grid gap-2"><Label htmlFor="workspace-domain">Workspace URL</Label><Input id="workspace-domain" defaultValue="app/northwind.workspace" /></div></div></div>}
          {step === 2 && <div className="grid gap-4 rounded-xl border bg-background p-4 sm:p-5"><div><h2 className="text-base font-semibold">Set your preferences</h2><p className="mt-1 text-sm text-muted-foreground">Choose defaults that can be changed later in settings.</p></div><div className="grid gap-4"><div className="grid gap-2"><Label htmlFor="workspace-role">Your role</Label><NativeSelect id="workspace-role" fullWidth value={role} onChange={(event) => setRole(event.currentTarget.value)}><option value="admin">Workspace admin</option><option value="manager">Team manager</option><option value="member">Team member</option></NativeSelect></div><label className="flex items-start gap-3 rounded-lg border p-3 text-sm"><Checkbox checked={updates} onCheckedChange={(value) => setUpdates(value === true)} /><span><span className="font-medium">Product updates</span><span className="mt-1 block text-muted-foreground">Receive occasional notes about new workspace features.</span></span></label></div></div>}
          {step === 3 && <div className="grid gap-4 rounded-xl border bg-background p-4 sm:p-5"><div><h2 className="text-base font-semibold">Review your setup</h2><p className="mt-1 text-sm text-muted-foreground">Check these details before creating the workspace.</p></div><div className="divide-y rounded-lg border"><div className="flex items-center justify-between gap-4 p-4"><span className="text-sm text-muted-foreground">Workspace</span><span className="text-right text-sm font-medium">{workspace}</span></div><div className="flex items-center justify-between gap-4 p-4"><span className="text-sm text-muted-foreground">Role</span><span className="text-right text-sm font-medium">{role === "admin" ? "Workspace admin" : role === "manager" ? "Team manager" : "Team member"}</span></div><div className="flex items-center justify-between gap-4 p-4"><span className="text-sm text-muted-foreground">Product updates</span><span className="text-right text-sm font-medium">{updates ? "Enabled" : "Disabled"}</span></div></div></div>}
          <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between"><Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}><IconArrowLeft aria-hidden="true" />Back</Button><Button type="submit" className="w-full sm:w-auto">{step === steps.length ? "Create workspace" : "Continue"}<IconArrowRight aria-hidden="true" /></Button></div>
        </form>
      )}
    </div>
  );
}
