"use client";

import { type FormEvent, type ReactNode, useId } from "react";

import { IconCheck, IconSend } from "@tabler/icons-react";

import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/composite-input-group";
import { InputOtp } from "@/components/ui/composite-input-otp";
import { Button } from "@/components/ui/button";
import { HintText } from "@/components/ui/hint-text";
import { Label } from "@/components/ui/label";

type RecipientInputProps = {
  id: string;
  invalid: boolean;
  errorMessageId: string;
  onChange: () => void;
};

export type VerificationCodeFormProps = {
  recipientLabel: string;
  recipientErrorMessage: string;
  recipientInput: (props: RecipientInputProps) => ReactNode;
  recipientInvalid?: boolean;
  code: string;
  codeVisible: boolean;
  cooldownSecondsLeft: number;
  sendLabel: string;
  sendDisabled?: boolean;
  onCodeChange: (code: string) => void;
  onRecipientChange?: () => void;
  verifyLabel: string;
  onSendCode: () => void;
  onVerifyCode: () => void;
  codeLength?: number;
};

const verificationGroupClass = "has-disabled:bg-transparent has-disabled:opacity-100 dark:has-disabled:bg-transparent";

export function VerificationCodeForm({
  recipientLabel,
  recipientErrorMessage,
  recipientInput,
  recipientInvalid = false,
  code,
  codeVisible,
  cooldownSecondsLeft,
  sendLabel,
  sendDisabled = false,
  onCodeChange,
  onRecipientChange,
  verifyLabel,
  onSendCode,
  onVerifyCode,
  codeLength = 6,
}: VerificationCodeFormProps) {
  const id = useId();
  const errorMessageId = `${id}-error`;

  return (
    <form
      className="grid w-full gap-2"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSendCode();
      }}
    >
      <Label htmlFor={`${id}-recipient`}>{recipientLabel}</Label>
      <InputGroup className={verificationGroupClass}>
        {recipientInput({
          id: `${id}-recipient`,
          invalid: recipientInvalid,
          errorMessageId,
          onChange: onRecipientChange ?? (() => undefined),
        })}
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" size="xs" disabled={sendDisabled} aria-label={sendLabel} title={sendLabel}>
            {cooldownSecondsLeft > 0 ? (
              <>
                <IconCheck className="size-3.5" />
                {cooldownSecondsLeft}s
              </>
            ) : (
              <IconSend className="size-4" aria-hidden="true" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {recipientInvalid ? (
        <HintText id={errorMessageId} variant="error">
          {recipientErrorMessage}
        </HintText>
      ) : null}
      {codeVisible ? (
        <div className="flex flex-wrap items-center gap-2">
          <InputOtp aria-label={`${codeLength}-digit verification code`} value={code} onChange={onCodeChange} />
          <Button type="button" variant="outline" disabled={code.length !== codeLength} onClick={onVerifyCode}>
            {verifyLabel}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
