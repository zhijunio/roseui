"use client";

import type * as React from "react";

export type FormProps = React.ComponentProps<"form">;

export function Form(props: FormProps) {
  return <form data-slot="form" {...props} />;
}
