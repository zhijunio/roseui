"use client";

import * as React from "react";

import { PasswordField, type PasswordFieldProps } from "@/components/composite/password-field";
import { cn } from "@/lib/utils";

export type PasswordStrengthRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export type PasswordStrengthResult = {
  level: number;
  total: number;
  met: number;
  label: string;
};

export const defaultPasswordRules: PasswordStrengthRule[] = [
  { id: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
  { id: "uppercase", label: "One uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { id: "number", label: "One number", test: (value) => /[0-9]/.test(value) },
  { id: "symbol", label: "One symbol", test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export type PasswordStrengthProps = Omit<PasswordFieldProps, "onValueChange"> & {
  rules?: PasswordStrengthRule[];
  onValueChange?: (value: string, result: PasswordStrengthResult) => void;
};

function describeStrength(met: number, total: number): PasswordStrengthResult {
  const label = total === 0 || met === 0
    ? "Requirements not met"
    : met === total
      ? "All requirements met"
      : "More requirements needed";

  return { level: met, total, met, label };
}

function PasswordStrength({
  id: providedId,
  value,
  defaultValue = "",
  onValueChange,
  rules = defaultPasswordRules,
  description,
  ...props
}: PasswordStrengthProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const rulesId = `${id}-requirements`;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;
  const met = rules.filter((rule) => rule.test(currentValue)).length;
  const result = describeStrength(met, rules.length);

  function updateValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next, describeStrength(rules.filter((rule) => rule.test(next)).length, rules.length));
  }

  return (
    <div className="grid gap-2">
      <PasswordField
        {...props}
        id={id}
        value={currentValue}
        onValueChange={updateValue}
        description={description}
        aria-describedby={[props["aria-describedby"], rulesId].filter(Boolean).join(" ")}
        autoComplete={props.autoComplete ?? "new-password"}
      />
      <div
        role="meter"
        aria-label="Password requirements met"
        aria-valuemin={0}
        aria-valuemax={rules.length}
        aria-valuenow={met}
        aria-valuetext={`${met} of ${rules.length} requirements met`}
        className="flex gap-1.5"
      >
        {rules.map((rule, index) => (
          <span
            key={rule.id}
            aria-hidden="true"
            className={cn(
              "h-1 flex-1 rounded-full bg-muted motion-safe:transition-colors motion-safe:duration-[var(--duration-fast)] motion-reduce:transition-none",
              index < met && "bg-primary",
            )}
          />
        ))}
      </div>
      <ul id={rulesId} className="grid gap-1 sm:grid-cols-2">
        {rules.map((rule) => {
          const isMet = rule.test(currentValue);
          return (
            <li key={rule.id} className={cn("text-xs", isMet ? "text-foreground" : "text-muted-foreground")}>
              <span aria-hidden="true" className="mr-1">{isMet ? "✓" : "○"}</span>
              {rule.label}
            </li>
          );
        })}
      </ul>
      <p role="status" aria-live="polite" className="sr-only">{result.label}: {met} of {rules.length} requirements met.</p>
    </div>
  );
}

export { PasswordStrength };
