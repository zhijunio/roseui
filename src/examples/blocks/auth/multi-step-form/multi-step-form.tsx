"use client";

import * as React from "react";

import { Stepper, StepperContent } from "@/components/ui/stepper";

import { steps, type WorkspaceRole } from "./data";
import { FormActions } from "./form-actions";
import { PreferencesStep } from "./preferences-step";
import { ReviewStep } from "./review-step";
import { StepNavigation } from "./step-navigation";
import { WorkspaceReady } from "./workspace-ready";
import { WorkspaceSetupProgress } from "./workspace-setup-progress";
import { WorkspaceStep } from "./workspace-step";

export function MultiStepFormExample() {
  const [step, setStep] = React.useState(1);
  const [workspace, setWorkspace] = React.useState("Northwind Studio");
  const [role, setRole] = React.useState<WorkspaceRole>("admin");
  const [updates, setUpdates] = React.useState(true);
  const [complete, setComplete] = React.useState(false);
  const currentStep = steps[step - 1] ?? steps[0];

  function handleStepChange(nextStep: number) {
    if (nextStep >= 1 && nextStep <= step + 1) setStep(nextStep);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length) {
      setStep((current) => current + 1);
    } else {
      setComplete(true);
    }
  }

  function startAgain() {
    setComplete(false);
    setStep(1);
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <WorkspaceSetupProgress step={step} currentStep={currentStep} totalSteps={steps.length} />
      <Stepper value={step} onValueChange={handleStepChange}>
        <StepNavigation currentStep={step} />
        {complete ? (
          <WorkspaceReady onStartAgain={startAgain} />
        ) : (
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <StepperContent value={1}>
              <WorkspaceStep workspace={workspace} onWorkspaceChange={setWorkspace} />
            </StepperContent>
            <StepperContent value={2}>
              <PreferencesStep role={role} updates={updates} onRoleChange={setRole} onUpdatesChange={setUpdates} />
            </StepperContent>
            <StepperContent value={3}>
              <ReviewStep workspace={workspace} role={role} updates={updates} />
            </StepperContent>
            <FormActions
              step={step}
              totalSteps={steps.length}
              onBack={() => setStep((current) => Math.max(1, current - 1))}
            />
          </form>
        )}
      </Stepper>
    </div>
  );
}
