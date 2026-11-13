import Link from "next/link";

import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/ui/logo-mark";
import { PasswordField } from "@/components/ui/password-field";
import { SocialButton } from "@/components/ui/social-button";
import { ComponentPreview } from "@/examples/component-preview";

const socialProviders = ["google", "apple", "github", "microsoft"] as const;

export function SignUpExample() {
  return (
    <ComponentPreview title="Create account" layout="fullBleed" span={2}>
      <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
        <div className="mb-7 grid justify-items-center gap-3 text-center">
          <LogoMark size={40} iconSize={28} />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          </div>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sign-up-name">Full name</Label>
            <Input id="sign-up-name" autoComplete="name" placeholder="Alex Morgan" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sign-up-email">Work email</Label>
            <Input id="sign-up-email" type="email" autoComplete="email" placeholder="you@company.com" />
          </div>
          <PasswordField
            id="sign-up-password"
            label="Password"
            autoComplete="new-password"
            placeholder="Create a password"
          />
          <PasswordField
            id="sign-up-confirm-password"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Enter it again"
          />
          <div className="flex items-center gap-2">
            <Checkbox id="sign-up-terms" />
            <Label htmlFor="sign-up-terms" className="text-sm font-normal">
              I agree to the Terms &amp; Privacy Policy
            </Label>
          </div>
          <Button asChild className="w-full">
            <Link href="/components/accordion">
              Create account
              <IconArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </form>
        <div className="text-muted-foreground my-5 flex items-center gap-3 text-xs">
          <span className="bg-border h-px flex-1" />
          or sign up with
          <span className="bg-border h-px flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {socialProviders.map((brand) => (
            <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
          ))}
        </div>
        <p className="text-muted-foreground mt-5 text-center text-xs">
          By continuing, you agree to our <span className="underline underline-offset-4">Terms of Service</span> and{" "}
          <span className="underline underline-offset-4">Privacy Policy</span>.
        </p>
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Link href="/blocks/auth/sign-in" className="text-foreground font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </ComponentPreview>
  );
}
