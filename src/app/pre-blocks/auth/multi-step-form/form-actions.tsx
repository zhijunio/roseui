import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function FormActions({ step, totalSteps, onBack }: { step: number; totalSteps: number; onBack: () => void }) {
  return (
    <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onBack} disabled={step === 1}>
        <IconArrowLeft aria-hidden="true" />
        Back
      </Button>
      <Button type="submit" className="w-full sm:w-auto">
        {step === totalSteps ? "Create workspace" : "Continue"}
        <IconArrowRight aria-hidden="true" />
      </Button>
    </div>
  );
}
