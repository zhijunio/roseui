"use client";

import * as React from "react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { PasswordStrength, type PasswordStrengthResult } from "@/components/composite/password-strength";

function PasswordStrengthExamplesContent() {
  const [result, setResult] = React.useState<PasswordStrengthResult>({ level: 0, total: 4, met: 0, label: "Requirements not met" });
  const [notice, setNotice] = React.useState("");

  return (
    <>
      <ComponentPreview previewId="password-strength-01" title="Set a workspace password" span={2} layout="panel">
        <form
          className="grid w-full max-w-lg gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setNotice("Password requirements are met. Continue with your account setup.");
          }}
        >
          <PasswordStrength
            label="New password"
            autoComplete="new-password"
            onValueChange={(_, next) => {
              setResult(next);
              setNotice("");
            }}
            description="Meet each listed requirement before continuing."
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">{result.label}</span>
            <Button type="submit" size="sm" disabled={result.level < result.total}>Continue</Button>
          </div>
          <p role="status" aria-live="polite" className="text-xs text-muted-foreground">{notice}</p>
        </form>
      </ComponentPreview>
      <ComponentPreview previewId="password-strength-02" title="Existing policy requirements">
        <div className="w-full max-w-md">
          <PasswordStrength label="Choose a new password" defaultValue="TeamAccess9!" />
        </div>
      </ComponentPreview>
    </>
  );
}

export function PasswordStrengthExamples() {
  return <PasswordStrengthExamplesContent />;
}
