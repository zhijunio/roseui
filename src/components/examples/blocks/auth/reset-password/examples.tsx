"use client";

import * as React from "react";

import Link from "next/link";

import { IconArrowLeft, IconLock } from "@tabler/icons-react";

import { PasswordField } from "@/components/composite/password-field";
import { PasswordStrength, type PasswordStrengthResult } from "@/components/composite/password-strength";
import { Button } from "@/components/ui/button";

export function ResetPasswordForm() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [strength, setStrength] = React.useState<PasswordStrengthResult>({
    level: 0,
    total: 4,
    met: 0,
    label: "Requirements not met",
  });
  const match = confirm.length > 0 && confirm === password;

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <div className="bg-card mb-3 flex size-11 items-center justify-center rounded-xl border">
          <IconLock className="size-5" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Set a new password</h1>
        <p className="text-muted-foreground text-sm">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form className="space-y-4">
        <PasswordStrength
          id="password"
          label="New password"
          value={password}
          onValueChange={(next, result) => {
            setPassword(next);
            setStrength(result);
          }}
          autoComplete="new-password"
          placeholder="Enter a new password"
        />

        <PasswordField
          id="confirm"
          label="Confirm password"
          value={confirm}
          onValueChange={setConfirm}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={confirm.length > 0 && !match ? "Passwords do not match." : undefined}
        />

        <Button asChild className="w-full" disabled={strength.level < strength.total || !match}>
          <Link href="/blocks/auth/sign-in">Reset password</Link>
        </Button>
      </form>

      <Link
        href="/blocks/auth/sign-in"
        className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 text-sm"
      >
        <IconArrowLeft aria-hidden="true" className="size-4" /> Back to sign in
      </Link>
    </div>
  );
}
