"use client";

import * as React from "react";
import { type FormEvent, useState } from "react";

import Link from "next/link";

import { IconArrowRight, IconEye, IconEyeOff, IconKey, IconLock, IconMail, IconShieldLock } from "@tabler/icons-react";

import { InputOtp } from "@/components/composite/input-otp";
import { PasswordField } from "@/components/composite/password-field";
import { SocialButton, type SocialProvider } from "@/components/composite/social-button";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogoMark } from "@/components/ui/logo-mark";

const socialProviders = ["google", "apple", "github", "microsoft"] as const satisfies readonly SocialProvider[];

type MethodExample = {
  slug: "method-picker";
  title: string;
  providers: readonly SocialProvider[];
};

const methodExample: MethodExample = {
  slug: "method-picker",
  title: "Choose a Sign-In Method",
  providers: [],
};

function PasswordSignInExample() {
  return (
    <section className="mx-auto w-full max-w-md p-2" aria-labelledby="sign-in-example-title">
      <div className="mb-7 grid justify-items-center gap-3 text-center">
        <LogoMark size={40} iconSize={28} />
        <div>
          <h2 id="sign-in-example-title" className="text-xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Continue to your workspace.</p>
        </div>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sign-in-email">Work email</Label>
          <Input id="sign-in-email" type="email" autoComplete="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <PasswordField
            id="sign-in-password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
          <div className="flex justify-end">
            <Link href="/blocks/auth/forgot-password" className="text-muted-foreground hover:text-foreground text-xs">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="sign-in-remember" defaultChecked />
          <Label htmlFor="sign-in-remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
        <Button asChild className="w-full">
          <Link href="/components/accordion">
            Sign in <IconArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </form>
      <div className="text-muted-foreground my-5 flex items-center gap-3 text-xs">
        <span className="bg-border h-px flex-1" />
        or continue with
        <span className="bg-border h-px flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {socialProviders.map((brand) => (
          <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
        ))}
      </div>
    </section>
  );
}

function MagicLinkExample({ preview = false }: { preview?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <section
      className={`mx-auto w-full ${preview ? "max-w-sm py-2" : "bg-card max-w-md rounded-2xl border p-6 shadow-sm sm:p-8"}`}
      aria-labelledby="magic-link-title"
    >
      <div className="mb-6 grid justify-items-center gap-3 text-center">
        {sent ? (
          <span className="bg-background flex size-11 items-center justify-center rounded-xl border">
            <IconMail aria-hidden="true" className="size-5" />
          </span>
        ) : (
          <LogoMark size={40} iconSize={28} />
        )}
        <div>
          <h2 id="magic-link-title" className="text-xl font-semibold tracking-tight">
            Sign in with a magic link
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">We&apos;ll send a one-time link to your work email.</p>
        </div>
      </div>
      {sent ? (
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground text-sm">
            Check <span className="text-foreground font-medium">{email}</span> for your sign-in link.
          </p>
          <Button type="button" variant="outline" className="w-full" onClick={() => setSent(false)}>
            Use a different email
          </Button>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground text-sm"
            onClick={() => setSent(false)}
          >
            Send again
          </button>
        </div>
      ) : (
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-2">
            <Label htmlFor="magic-link-email">Work email</Label>
            <Input
              id="magic-link-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Email me a sign-in link <IconArrowRight aria-hidden="true" />
          </Button>
        </form>
      )}
    </section>
  );
}

type LoginStep = { kind: "email" } | { kind: "code"; email: string } | { kind: "complete" };

function CenteredLoginExample() {
  const [step, setStep] = React.useState<LoginStep>({ kind: "email" });
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [notice, setNotice] = React.useState("");
  function sendCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep({ kind: "code", email });
    setNotice(`A verification code was sent to ${email}.`);
  }
  function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.length !== 6) return;
    setStep({ kind: "complete" });
    setNotice("You are signed in. This is a demo flow.");
  }
  return (
    <section
      className="relative isolate mx-auto w-full max-w-sm overflow-hidden p-2"
      aria-labelledby="centered-login-example-title"
    >
      <div className="relative space-y-6">
        <div className="grid justify-items-center gap-3 text-center">
          <LogoMark size={40} iconSize={28} />
          <div>
            <h2 id="centered-login-example-title" className="text-xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">Sign in with your email or a passkey.</p>
          </div>
        </div>
        {step.kind === "email" && (
          <>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setStep({ kind: "complete" });
                setNotice("Passkey sign-in completed for this demo.");
              }}
            >
              <IconKey aria-hidden="true" /> Use a passkey
            </Button>
            <div className="text-muted-foreground flex items-center gap-3 text-xs">
              <span className="bg-border h-px flex-1" /> or continue with email{" "}
              <span className="bg-border h-px flex-1" />
            </div>
            <form className="space-y-4" onSubmit={sendCode}>
              <div className="space-y-2">
                <Label htmlFor="centered-login-email">Work email</Label>
                <Input
                  id="centered-login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Continue <IconArrowRight aria-hidden="true" />
              </Button>
            </form>
          </>
        )}
        {step.kind === "code" && (
          <form className="space-y-5" onSubmit={verifyCode}>
            <div className="grid justify-items-center gap-3 text-center">
              <span className="bg-background flex size-11 items-center justify-center rounded-xl border">
                <IconShieldLock aria-hidden="true" className="size-5" />
              </span>
              <p className="text-muted-foreground text-sm">
                Enter the six-digit code sent to <span className="text-foreground font-medium">{step.email}</span>.
              </p>
            </div>
            <InputOtp
              value={code}
              onChange={setCode}
              aria-label="Verification code"
              className="justify-center"
              groupEvery={3}
            />
            <Button type="submit" className="w-full" disabled={code.length !== 6}>
              Verify <IconArrowRight aria-hidden="true" />
            </Button>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground w-full text-center text-sm"
              onClick={() => {
                setCode("");
                setNotice(`A new verification code was sent to ${step.email}.`);
              }}
            >
              Resend code
            </button>
          </form>
        )}
        {step.kind === "complete" && (
          <div className="space-y-4 text-center">
            <div className="bg-primary text-primary-foreground mx-auto flex size-11 items-center justify-center rounded-full">
              <IconLock aria-hidden="true" className="size-5" />
            </div>
            <p className="text-muted-foreground text-sm">Your workspace is ready.</p>
            <Button asChild className="w-full">
              <Link href="/components/accordion">Open workspace</Link>
            </Button>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-sm"
              onClick={() => {
                setStep({ kind: "email" });
                setCode("");
                setNotice("");
              }}
            >
              Use another sign-in method
            </button>
          </div>
        )}
        <p aria-live="polite" className="text-muted-foreground min-h-5 text-center text-xs">
          {notice}
        </p>
        <p className="text-muted-foreground text-center text-sm">
          Need an account?{" "}
          <Link href="/blocks/auth/sign-up" className="text-foreground font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

function MethodPickerExample({ example, preview = false }: { example: MethodExample; preview?: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const isMagicLink = selectedMethod === "Email";
  const isMethodPicker = !selectedMethod;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      isMagicLink
        ? `A sign-in link is ready for ${email || "your work email"}.`
        : "This sign-in example is not connected to an account.",
    );
  }
  return (
    <section
      className={`mx-auto w-full ${preview ? "max-w-sm py-2" : "bg-card max-w-md rounded-2xl border p-6 shadow-sm sm:p-8"}`}
      aria-labelledby={`auth-example-${example.slug}`}
    >
      <div className="mb-6 grid justify-items-center gap-3 text-center">
        <LogoMark size={40} iconSize={28} />
        <div>
          <h2 id={`auth-example-${example.slug}`} className="text-xl font-semibold tracking-tight">
            Sign in to RoseUI
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back. Continue to your workspace.</p>
        </div>
      </div>
      {isMethodPicker ? (
        <div className="grid gap-2">
          <Button
            type="button"
            variant="outline"
            className="justify-start gap-3"
            onClick={() => setSelectedMethod("Passkey")}
          >
            <IconKey aria-hidden="true" /> Use a passkey
          </Button>
          <Button
            type="button"
            variant="outline"
            className="justify-start gap-3"
            onClick={() => setSelectedMethod("SSO")}
          >
            <IconLock aria-hidden="true" /> Continue with SSO
          </Button>
          <Button type="button" variant="outline" onClick={() => setSelectedMethod("Email")}>
            Continue with email
          </Button>
        </div>
      ) : selectedMethod !== "Email" ? (
        <div className="grid gap-3 text-center">
          <p className="text-muted-foreground text-sm">Continue with {selectedMethod} to access your workspace.</p>
          <Button type="button" onClick={() => setNotice(`${selectedMethod} sign-in is a demo action.`)}>
            Continue with {selectedMethod}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSelectedMethod(null);
              setNotice("");
            }}
          >
            Choose another method
          </Button>
        </div>
      ) : (
        <form className="grid gap-3.5" onSubmit={submit}>
          <label className="grid gap-1.5 text-sm font-medium" htmlFor={`auth-email-${example.slug}`}>
            Work email
            <Input
              id={`auth-email-${example.slug}`}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
            />
          </label>
          {!isMagicLink && (
            <label className="grid gap-1.5 text-sm font-medium" htmlFor={`auth-password-${example.slug}`}>
              <span className="flex items-center justify-between">
                Password
                <Link
                  href="/blocks/auth/forgot-password"
                  className="text-muted-foreground hover:text-foreground text-xs font-normal"
                >
                  Forgot password?
                </Link>
              </span>
              <span className="relative">
                <Input
                  id={`auth-password-${example.slug}`}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-muted-foreground absolute inset-y-0 right-0 grid w-10 place-items-center"
                >
                  {showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                </button>
              </span>
            </label>
          )}
          <Button type="submit" className="mt-1 w-full">
            {isMagicLink ? "Continue with email" : "Sign in"}
          </Button>
        </form>
      )}
      {example.providers.length > 0 && !isMethodPicker && !selectedMethod && (
        <div className="mt-5 grid gap-3">
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span className="bg-border h-px flex-1" />
            or continue with
            <span className="bg-border h-px flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {example.providers.map((brand) => (
              <SocialButton
                key={brand}
                brand={brand}
                appearance="white"
                fullWidth
                onClick={() => setNotice(`${brand[0].toUpperCase()}${brand.slice(1)} sign-in is a demo action.`)}
              />
            ))}
          </div>
        </div>
      )}
      {notice && (
        <p role="status" className="bg-muted text-muted-foreground mt-4 rounded-lg px-3 py-2 text-center text-xs">
          {notice}
        </p>
      )}
      {!preview && (
        <>
          <p className="text-muted-foreground mt-5 text-center text-xs">
            By continuing, you agree to our <span className="underline underline-offset-4">Terms of Service</span> and{" "}
            <span className="underline underline-offset-4">Privacy Policy</span>.
          </p>
          <p className="text-muted-foreground mt-4 text-center text-sm">
            Need an account?{" "}
            <Link href="/blocks/auth/sign-up" className="text-foreground font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </>
      )}
    </section>
  );
}

export function SignInExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Password sign-in" layout="fullStack">
        <PasswordSignInExample />
      </ComponentPreview>
      <ComponentPreview title="Magic link" layout="fullStack">
        <MagicLinkExample preview />
      </ComponentPreview>
      <ComponentPreview title="Email and passkey" layout="fullStack">
        <CenteredLoginExample />
      </ComponentPreview>
      <ComponentPreview title={methodExample.title} layout="fullStack">
        <MethodPickerExample example={methodExample} preview />
      </ComponentPreview>
    </div>
  );
}
