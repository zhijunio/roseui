import Link from "next/link";

import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentPreview } from "@/examples/component-preview";

export function ForgotPasswordExample() {
  return (
    <ComponentPreview title="Reset instructions" layout="fullBleed" span={2}>
      <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-password-email">Email</Label>
            <Input id="forgot-password-email" type="email" placeholder="alex@roseui.com" />
          </div>
          <Button asChild className="w-full">
            <Link href="/blocks/auth/sign-in">Send reset link</Link>
          </Button>
        </form>
        <Link
          href="/blocks/auth/sign-in"
          className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 text-sm"
        >
          <IconArrowLeft className="size-4" />
          Back to sign in
        </Link>
      </div>
    </ComponentPreview>
  );
}
