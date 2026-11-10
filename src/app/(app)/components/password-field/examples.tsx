"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { PasswordField } from "@/components/composite/password-field";

function PasswordFieldExamplesContent() {
  const [password, setPassword] = React.useState("");

  return (
    <>
      <ComponentPreview previewId="password-field-01" title="Sign-in field">
        <div className="w-full max-w-md">
          <PasswordField label="Account password" autoComplete="current-password" placeholder="Enter your password" />
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="password-field-02" title="Create a password">
        <div className="w-full max-w-md">
          <PasswordField
            label="New password"
            autoComplete="new-password"
            value={password}
            onValueChange={setPassword}
            description="Use the password requirements shown in your account setup."
            placeholder="Create a password"
          />
          <p role="status" aria-live="polite" className="mt-2 text-xs text-muted-foreground">
            {password ? `${password.length} characters entered.` : "No password entered."}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="password-field-03" title="Disabled and read-only">
        <div className="grid w-full max-w-md gap-4">
          <PasswordField label="Managed password" disabled defaultValue="ManagedByPolicy9!" />
          <PasswordField label="Saved credential" readOnly defaultValue="StoredCredential9!" />
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="password-field-04" title="Validation message">
        <div className="w-full max-w-md">
          <PasswordField label="Account password" defaultValue="short" error="Check the password and try again." />
        </div>
      </ComponentPreview>
    </>
  );
}

export function PasswordFieldExamples() {
  return <PasswordFieldExamplesContent />;
}
