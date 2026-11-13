import Link from "next/link";

import { ArrowLeft as IconArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordExample() {
  return (
    <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="forgot-password-email">Email</Label>
          <Input id="forgot-password-email" type="email" placeholder="alex@roseui.com" />
        </div>
        <Link href="/docs/blocks/auth/sign-in" className={buttonVariants({ className: "w-full" })}>
          Send reset link
        </Link>
      </form>
      <Link
        href="/docs/blocks/auth/sign-in"
        className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 text-sm"
      >
        <IconArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <ForgotPasswordExample />
    </main>
  );
}
