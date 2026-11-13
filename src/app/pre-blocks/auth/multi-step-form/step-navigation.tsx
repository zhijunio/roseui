import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

import { steps } from "./data";

export function StepNavigation({ currentStep }: { currentStep: number }) {
  return (
    <StepperNav
      aria-label="Workspace setup steps"
      className="bg-muted/30 items-start gap-2 rounded-xl border p-2.5 sm:gap-3 sm:p-3"
    >
      {steps.map((item, index) => (
        <Fragment key={item.title}>
          <StepperItem step={index + 1} completed={index + 1 < currentStep} disabled={index + 1 > currentStep + 1}>
            <StepperTrigger
              aria-label={`${item.title}: ${item.description}`}
              className="group-data-[state=active]/step:bg-background items-start rounded-lg p-1.5 transition-colors group-data-[state=active]/step:shadow-sm"
            >
              <StepperIndicator>{index + 1}</StepperIndicator>
              <span className="hidden min-w-0 text-left sm:block">
                <StepperTitle>{item.title}</StepperTitle>
                <StepperDescription>{item.description}</StepperDescription>
              </span>
            </StepperTrigger>
          </StepperItem>
          {index < steps.length - 1 && <StepperSeparator />}
        </Fragment>
      ))}
    </StepperNav>
  );
}

import { Fragment } from "react";
