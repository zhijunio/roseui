"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const panel = "mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm";

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
