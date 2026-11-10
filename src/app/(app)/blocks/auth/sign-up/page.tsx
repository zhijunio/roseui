import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialButton } from "@/components/composite/social-button";
import { PasswordField } from "@/components/composite/password-field";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { LogoMark } from "@/components/ui/logo-mark";

const socialProviders = ["google", "apple", "github", "microsoft"] as const;

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sign Up" description="Create a workspace account with profile, password, and provider options." />
      <ComponentPreview previewId="auth-sign-up-01" title="Create account" layout="fullBleed" span={2}>
      <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
      <div className="mb-7 grid justify-items-center gap-3 text-center">
        <LogoMark size={40} iconSize={28} />
        <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up your workspace account.
        </p>
        </div>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" placeholder="Alex Morgan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <PasswordField id="password" label="Password" autoComplete="new-password" placeholder="Create a password" />
        </div>
        <div className="space-y-2">
          <PasswordField id="confirm-password" label="Confirm password" autoComplete="new-password" placeholder="Enter it again" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the Terms & Privacy Policy
          </Label>
        </div>
        <Button asChild className="w-full">
          <Link href="/blocks/app-layout/workspace">Create account <IconArrowRight aria-hidden="true" /></Link>
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or sign up with
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {socialProviders.map((brand) => (
          <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
        ))}
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        By continuing, you agree to our <span className="underline underline-offset-4">Terms of Service</span> and <span className="underline underline-offset-4">Privacy Policy</span>.
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/blocks/auth/sign-in" className="font-medium text-foreground hover:underline">
          Sign in
        </Link>
      </p>
      </div>
      </ComponentPreview>
    </div>
  );
}
