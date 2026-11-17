"use client";

import { useId, useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { RoseInput } from "@/components/roseui/input";
import { TextField } from "@/components/roseui/text-field";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";

export function TextFieldExamples() {
  const [value, setValue] = useState("");
  const workspaceId = useId();
  const emailId = useId();
  const requiredEmailId = useId();
  const disabledId = useId();
  const readOnlyId = useId();
  const displayNameId = useId();

  return (
    <>
      <ComponentPreview title="Text Field" layout="grid2">
        <TextField id={workspaceId} aria-label="Workspace name" name="workspace">
          <FieldLabel htmlFor={workspaceId}>Workspace name</FieldLabel>
          <RoseInput placeholder="Acme Studio" />
        </TextField>
        <TextField id={emailId} name="email" type="email">
          <FieldLabel htmlFor={emailId}>Email address</FieldLabel>
          <RoseInput placeholder="you@example.com" />
          <FieldDescription>Use your work email address.</FieldDescription>
        </TextField>
      </ComponentPreview>

      <ComponentPreview title="Validation" layout="field">
        <form className="w-full max-w-sm space-y-4">
          <TextField id={requiredEmailId} required name="email" type="email">
            <FieldLabel htmlFor={requiredEmailId}>Email address</FieldLabel>
            <RoseInput placeholder="you@example.com" />
            <FieldError />
          </TextField>
          <Button type="submit">Continue</Button>
        </form>
      </ComponentPreview>

      <ComponentPreview title="States" layout="grid2">
        <TextField id={disabledId} disabled>
          <FieldLabel htmlFor={disabledId}>Disabled</FieldLabel>
          <RoseInput defaultValue="Cannot be edited" />
        </TextField>
        <TextField id={readOnlyId} readOnly>
          <FieldLabel htmlFor={readOnlyId}>Read only</FieldLabel>
          <RoseInput defaultValue="Managed by your administrator" />
        </TextField>
      </ComponentPreview>

      <ComponentPreview title="Controlled" layout="field">
        <TextField id={displayNameId} value={value} onChange={setValue} name="displayName">
          <FieldLabel htmlFor={displayNameId}>Display name</FieldLabel>
          <RoseInput placeholder="Enter a display name" />
          <FieldDescription>{value.length}/40 characters</FieldDescription>
        </TextField>
      </ComponentPreview>
    </>
  );
}
