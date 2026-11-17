"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextFieldContextValue = {
  id: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean;
};
const TextFieldContext = React.createContext<TextFieldContextValue | null>(null);
export function useTextFieldContext() {
  return React.useContext(TextFieldContext);
}

export type TextFieldProps = Omit<React.ComponentProps<"div">, "children" | "onChange" | "defaultValue"> & {
  children?: React.ReactNode;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
};

export function TextField({
  className,
  id,
  name,
  type,
  value,
  defaultValue,
  onChange,
  disabled,
  readOnly,
  required,
  invalid,
  children,
  ...props
}: TextFieldProps) {
  const generatedId = React.useId();
  const context = React.useMemo<TextFieldContextValue>(
    () => ({
      id: id ?? generatedId,
      name,
      type,
      value,
      defaultValue,
      onChange,
      disabled: disabled ?? false,
      readOnly: readOnly ?? false,
      required: required ?? false,
      invalid: invalid ?? false,
    }),
    [defaultValue, disabled, generatedId, id, invalid, name, onChange, readOnly, required, type, value],
  );
  return (
    <TextFieldContext.Provider value={context}>
      <div
        role="group"
        data-slot="control"
        data-disabled={context.disabled || undefined}
        data-invalid={context.invalid || undefined}
        data-readonly={context.readOnly || undefined}
        data-required={context.required || undefined}
        className={cn("flex w-full flex-col gap-1.5", context.disabled && "opacity-50", className)}
        {...props}
      >
        {children}
      </div>
    </TextFieldContext.Provider>
  );
}
