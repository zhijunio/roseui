"use client";

import { Form as FormPrimitive, type FormProps } from "react-aria-components/Form";

export function Form(props: FormProps) {
  return <FormPrimitive data-slot="form" {...props} />;
}
