"use client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { IconArrowLeft, IconShieldLock } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LENGTH = 6;
const otpSlots = ["one", "two", "three", "four", "five", "six"] as const;

export function VerifyOtpExample() {
  const router = useRouter();
  const [digits, setDigits] = React.useState<string[]>(Array(LENGTH).fill(""));
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
  const code = digits.join("");
  const complete = code.length === LENGTH;

  function setAt(index: number, value: string) {
    setDigits((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  }

  function handleChange(index: number, raw: string) {
    const value = raw.replace(/\D/g, "");
    if (!value) {
      setAt(index, "");
      return;
    }
    if (value.length > 1) {
      const chars = value.slice(0, LENGTH - index).split("");
      setDigits((previous) => {
        const next = [...previous];
        chars.forEach((character, offset) => {
          next[index + offset] = character;
        });
        return next;
      });
      const last = Math.min(index + chars.length, LENGTH - 1);
      inputs.current[last]?.focus();
      return;
    }
    setAt(index, value);
    if (index < LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  }

  return (
    <ComponentPreview title="Two-factor verification" layout="fullBleed" span={2}>
      <div className="mx-auto w-full max-w-md space-y-6 px-1 py-2 sm:px-2">
        <div className="space-y-1.5">
          <div className="bg-card mb-3 flex size-11 items-center justify-center rounded-xl border">
            <IconShieldLock className="size-5" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Two-factor verification</h1>
          <p className="text-muted-foreground text-sm">
            We sent a 6-digit code to <span className="text-foreground font-medium">alex@roseui.com</span>. Enter it
            below to continue.
          </p>
        </div>
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/components/accordion");
          }}
        >
          <div className="flex justify-between gap-2">
            {digits.map((digit, index) => (
              <input
                key={otpSlots[index]}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={LENGTH}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onFocus={(event) => event.target.select()}
                className={cn(
                  "bg-background size-12 rounded-lg border text-center text-lg! font-semibold tabular-nums shadow-sm transition-colors outline-none",
                  "focus:border-ring focus:ring-ring/40 focus:ring-2",
                  digit && "border-foreground/30",
                )}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={!complete}>
            Verify
          </Button>
        </form>
        <p className="text-muted-foreground text-center text-sm">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            className="text-foreground font-medium hover:underline"
            onClick={() => {
              setDigits(Array(LENGTH).fill(""));
              inputs.current[0]?.focus();
            }}
          >
            Resend
          </button>
        </p>
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
