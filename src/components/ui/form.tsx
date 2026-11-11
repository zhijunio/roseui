"use client";

import type { ComponentProps } from "react";
import { Form as FormPrimitive } from "radix-ui";

type FormProps = ComponentProps<typeof FormPrimitive.Root> & {
  validationBehavior?: "aria" | "native";
  validationErrors?: Record<string, string>;
};

export function Form({ validationBehavior, validationErrors, ...props }: FormProps) {
  void validationBehavior;
  void validationErrors;
  return <FormPrimitive.Root data-slot="form" {...props} />;
}
