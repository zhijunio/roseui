"use client";

import { useEffect, useId, useState } from "react";

import { FieldError, FieldLegend, FieldSet } from "@/components/composite/field";
import { InputOtp } from "@/components/composite/input-otp";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function OtpResendExample() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = window.setTimeout(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  function sendCode() {
    setSent(true);
    setSecondsLeft(30);
  }

  return (
    <div className="grid w-full max-w-sm gap-3">
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Enter the verification code</legend>
        <InputOtp length={6} groupEvery={3} aria-label="Six-digit verification code" />
      </fieldset>
      <div className="flex min-h-8 items-center gap-2 text-sm">
        <p className="text-muted-foreground" aria-live="polite">
          {secondsLeft > 0
            ? `Code sent. Resend in 00:${secondsLeft.toString().padStart(2, "0")}`
            : sent
              ? "You can request another code."
              : "Didn't receive the code?"}
        </p>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-auto p-0"
          disabled={secondsLeft > 0}
          onClick={sendCode}
        >
          Resend
        </Button>
      </div>
    </div>
  );
}

function OtpFormExample() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const errorId = useId();
  const invalid = submitted && code.length !== 6;

  return (
    <Form
      className="grid w-full max-w-sm gap-3"
      validationBehavior="aria"
      onSubmit={(event) => {
        event.preventDefault();
        const formCode = new FormData(event.currentTarget).get("verificationCode");
        setSubmitted(true);
        setVerified(formCode?.toString().length === 6);
      }}
      onReset={() => {
        setCode("");
        setSubmitted(false);
        setVerified(false);
      }}
    >
      <FieldSet className="gap-2">
        <FieldLegend variant="label">Verification code</FieldLegend>
        <InputOtp
          name="verificationCode"
          value={code}
          onChange={(nextCode) => {
            setCode(nextCode);
            setSubmitted(false);
            setVerified(false);
          }}
          invalid={invalid}
          aria-label="Six-digit verification code"
          aria-describedby={invalid ? errorId : undefined}
        />
        {invalid && <FieldError id={errorId}>Enter all six digits.</FieldError>}
      </FieldSet>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm">
          Verify
        </Button>
        <Button type="reset" size="sm" variant="outline">
          Reset
        </Button>
        {verified && (
          <span className="text-sm text-success" role="status">
            Code verified.
          </span>
        )}
      </div>
    </Form>
  );
}

function InputOtpDemoContent() {
  const [code, setCode] = useState("");
  const [complete, setComplete] = useState(false);

  return (
    <>
      <ComponentPreview title="Lengths and Grouping" layout="grid3" span={2}>
        <div className="grid min-w-0 gap-2">
          <p className="text-sm font-medium">Six-digit code</p>
          <InputOtp aria-label="Six-digit verification code" />
        </div>
        <div className="grid min-w-0 gap-2">
          <p className="text-sm font-medium">Four-digit PIN</p>
          <InputOtp length={4} inputClassName="size-11 sm:size-12" aria-label="Four-digit PIN" />
        </div>
        <div className="grid min-w-0 gap-2">
          <p className="text-sm font-medium">Grouped recovery code</p>
          <InputOtp
            length={8}
            groupEvery={4}
            inputClassName="size-8 sm:size-9"
            aria-label="Eight-character recovery code"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Controlled Completion" layout="field">
        <div className="grid gap-3">
          <InputOtp
            value={code}
            onChange={(nextCode) => {
              setCode(nextCode);
              setComplete(false);
            }}
            onComplete={() => setComplete(true)}
            aria-label="Enter six-digit verification code"
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {complete ? "Code complete." : `Entered ${code.length} of 6 digits.`}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Verification Form" layout="field">
        <OtpFormExample />
      </ComponentPreview>

      <ComponentPreview title="Alphanumeric Code" layout="field">
        <div className="grid gap-2">
          <InputOtp
            length={6}
            allowAlphanumeric
            groupEvery={3}
            defaultValue="A7B"
            aria-label="Six-character alphanumeric code"
            digitAriaLabel={(digit, total) => `Character ${digit} of ${total}`}
          />
          <p className="text-xs text-muted-foreground">Letters are accepted alongside numbers.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Invalid and Disabled" layout="grid2" exampleLabels={["Invalid", "Disabled"]}>
        <InputOtp defaultValue="12" invalid aria-label="Invalid six-digit verification code" />
        <InputOtp defaultValue="123456" disabled aria-label="Disabled six-digit verification code" />
      </ComponentPreview>

      <ComponentPreview title="Resend Cooldown" span={2} layout="field">
        <OtpResendExample />
      </ComponentPreview>
    </>
  );
}

export function InputOtpExamples() {
  return (
    <>
      <InputOtpDemoContent />
    </>
  );
}
