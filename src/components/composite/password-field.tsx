"use client";

import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type PasswordFieldProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  revealed?: boolean;
  defaultRevealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealLabel?: string;
  hideLabel?: string;
};

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      id: providedId,
      label,
      description,
      error,
      value,
      defaultValue,
      onChange,
      onValueChange,
      revealed,
      defaultRevealed = false,
      onRevealedChange,
      revealLabel = "Show password",
      hideLabel = "Hide password",
      autoComplete = "current-password",
      disabled,
      readOnly,
      required,
      className,
      "aria-describedby": describedBy,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = React.useId();
    const id = providedId ?? generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const [internalRevealed, setInternalRevealed] =
      React.useState(defaultRevealed);
    const isRevealed = revealed ?? internalRevealed;
    const describedByIds =
      [
        describedBy,
        description ? descriptionId : undefined,
        error ? errorId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    function changeReveal(next: boolean) {
      if (revealed === undefined) setInternalRevealed(next);
      onRevealedChange?.(next);
    }

    return (
      <div className="grid gap-2">
        <Label
          htmlFor={id}
          isRequired={required}
          isDisabled={disabled}
          isInvalid={Boolean(error)}
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            {...inputProps}
            ref={ref}
            id={id}
            type={isRevealed ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            onChange={(event) => {
              onChange?.(event);
              onValueChange?.(event.currentTarget.value);
            }}
            autoComplete={autoComplete}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={error ? true : inputProps["aria-invalid"]}
            aria-describedby={describedByIds}
            className={cn("pr-11", className)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={isRevealed ? hideLabel : revealLabel}
            aria-pressed={isRevealed}
            aria-controls={id}
            disabled={disabled}
            onClick={() => changeReveal(!isRevealed)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {isRevealed ? (
              <IconEyeOff aria-hidden="true" />
            ) : (
              <IconEye aria-hidden="true" />
            )}
          </Button>
        </div>
        {description && (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export { PasswordField };
