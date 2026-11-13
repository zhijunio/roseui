"use client";

import { useState } from "react";

import { Form } from "react-aria-components/Form";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";

export function TextFieldExamples() {
  const [value, setValue] = useState("");

  return (
    <>
      <ComponentPreview title="Text Field" layout="grid2">
        <TextField aria-label="Workspace name" name="workspace">
          <FieldLabel>Workspace name</FieldLabel>
          <Input placeholder="Acme Studio" />
        </TextField>
        <TextField name="email" type="email">
          <FieldLabel>Email address</FieldLabel>
          <Input placeholder="you@example.com" />
          <FieldDescription>Use your work email address.</FieldDescription>
        </TextField>
      </ComponentPreview>

      <ComponentPreview title="Validation" layout="field">
        <Form className="w-full max-w-sm space-y-4">
          <TextField isRequired name="email" type="email">
            <FieldLabel>Email address</FieldLabel>
            <Input placeholder="you@example.com" />
            <FieldError />
          </TextField>
          <Button type="submit">Continue</Button>
        </Form>
      </ComponentPreview>

      <ComponentPreview title="States" layout="grid2">
        <TextField isDisabled>
          <FieldLabel>Disabled</FieldLabel>
          <Input defaultValue="Cannot be edited" />
        </TextField>
        <TextField isReadOnly>
          <FieldLabel>Read only</FieldLabel>
          <Input defaultValue="Managed by your administrator" />
        </TextField>
      </ComponentPreview>

      <ComponentPreview title="Controlled" layout="field">
        <TextField value={value} onChange={setValue} name="displayName">
          <FieldLabel>Display name</FieldLabel>
          <Input placeholder="Enter a display name" />
          <FieldDescription>{value.length}/40 characters</FieldDescription>
        </TextField>
      </ComponentPreview>
    </>
  );
}
