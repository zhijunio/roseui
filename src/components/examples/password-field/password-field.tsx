"use client";

import * as React from "react";

import { PasswordField } from "@/components/ui/password-field";
import { ComponentPreview } from "@/examples/component-preview";

function PasswordFieldExamplesContent() {
  const [password, setPassword] = React.useState("");

  return (
    <>
      <ComponentPreview title="Sign-in field">
        <div className="w-full max-w-md">
          <PasswordField label="Account password" autoComplete="current-password" placeholder="Enter your password" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Create a password">
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
      <ComponentPreview title="Disabled and read-only">
        <div className="grid w-full max-w-md gap-4">
          <PasswordField label="Managed password" disabled defaultValue="ManagedByPolicy9!" />
          <PasswordField label="Saved credential" readOnly defaultValue="StoredCredential9!" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Validation message">
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
