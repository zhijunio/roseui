import type { Step } from "./data";

export function WorkspaceSetupProgress({
  step,
  currentStep,
  totalSteps,
}: {
  step: number;
  currentStep: Step;
  totalSteps: number;
}) {
  return (
    <>
      <div className="bg-muted/20 flex items-end justify-between gap-4 rounded-xl border px-4 py-3.5">
        <div>
          <p className="text-sm font-semibold tracking-tight">Workspace setup</p>
          <p aria-live="polite" className="text-muted-foreground mt-1 text-xs">
            Step {step} of {totalSteps}: {currentStep.description}
          </p>
        </div>
        <span className="bg-background text-muted-foreground rounded-full border px-2.5 py-1 text-xs font-semibold tabular-nums">
          {Math.round((step / totalSteps) * 100)}%
        </span>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full" aria-hidden="true">
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </>
  );
}
