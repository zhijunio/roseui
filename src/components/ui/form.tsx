"use client"

import { Form as AriaForm, type FormProps } from "react-aria-components"

export function Form(props: FormProps) {
  return <AriaForm data-slot="form" {...props} />
}
