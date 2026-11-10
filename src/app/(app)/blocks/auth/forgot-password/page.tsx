import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Forgot Password" description="Send a reset link to a workspace email address." />
      <ComponentPreview previewId="auth-forgot-password-01" title="Reset instructions" layout="fullBleed" span={2}>
      <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot password?
        </h1>
        <p className="text-sm text-muted-foreground">
          No worries, we&apos;ll send you reset instructions.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="alex@roseui.com" />
        </div>
        <Button asChild className="w-full">
          <Link href="/blocks/auth/sign-in">Send reset link</Link>
        </Button>
      </form>

      <Link
        href="/blocks/auth/sign-in"
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <IconArrowLeft className="size-4" /> Back to sign in
      </Link>
      </div>
      </ComponentPreview>
    </div>
  );
}
