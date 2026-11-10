"use client";

import * as React from "react";
import Image from "next/image";
import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconDeviceMobile,
  IconDownload,
  IconKey,
  IconMail,
  IconRefresh,
  IconShieldCheck,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOtp } from "@/components/composite/input-otp";

const setupKey = "JBSW Y3DP EHPK 3PXP";
const backupCodes = [
  "482103",
  "715422",
  "639044",
  "860217",
  "193805",
  "274691",
  "508326",
  "941572",
  "367418",
  "825039",
] as const;
const recoveryWords = [
  "north",
  "maple",
  "orbit",
  "studio",
  "river",
  "lantern",
  "canvas",
  "harbor",
  "copper",
  "meadow",
  "signal",
  "velvet",
] as const;

type CopyKind = "setup" | "backup" | "recovery";

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function CopyButton({ value, kind, copied, onCopy }: { value: string; kind: CopyKind; copied: CopyKind | null; onCopy: (value: string, kind: CopyKind) => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={() => onCopy(value, kind)}>
      <IconCopy aria-hidden="true" />
      {copied === kind ? "Copied" : "Copy"}
    </Button>
  );
}

function useCopyFeedback() {
  const [copied, setCopied] = React.useState<CopyKind | null>(null);

  async function copy(value: string, kind: CopyKind) {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return { copied, copy };
}

export function TotpSetupExample() {
  const [code, setCode] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const { copied, copy } = useCopyFeedback();

  return (
    <div className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <IconDeviceMobile aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold tracking-tight">Authenticator app</h2>
          <p className="mt-1 text-sm text-muted-foreground">Scan the QR code, then verify a code from your app.</p>
        </div>
      </div>

      {verified ? (
        <div className="grid justify-items-center gap-3 rounded-lg border border-dashed p-8 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><IconShieldCheck aria-hidden="true" /></span>
          <p className="font-medium">Authenticator app verified</p>
          <Button type="button" variant="outline" size="sm" onClick={() => { setVerified(false); setCode(""); }}>Set up again</Button>
        </div>
      ) : (
        <>
          <div className="grid justify-items-center gap-3">
            <div className="rounded-lg border bg-white p-3">
              <Image src="/authenticator-setup-qr.png" alt="QR code for authenticator app setup" width={180} height={180} className="size-40 sm:size-44" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-center">
              <span className="font-mono text-xs tracking-wider text-muted-foreground">{setupKey}</span>
              <CopyButton value={setupKey.replaceAll(" ", "")} kind="setup" copied={copied} onCopy={copy} />
            </div>
          </div>
          <div className="grid justify-items-center gap-3 border-t pt-5">
            <p className="text-sm font-medium">Enter the 6-digit code</p>
            <InputOtp value={code} onChange={setCode} aria-label="Authenticator app code" groupEvery={3} />
          </div>
          <Button type="button" className="w-full" disabled={code.length !== 6} onClick={() => setVerified(true)}>
            Verify authenticator <IconArrowRight aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}

export function EmailCodeExample() {
  const [code, setCode] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [resent, setResent] = React.useState(false);

  return (
    <div className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><IconMail aria-hidden="true" className="size-5" /></span>
        <div>
          <h2 className="font-semibold tracking-tight">Email verification code</h2>
          <p className="mt-1 text-sm text-muted-foreground">Enter the code sent to <span className="font-medium text-foreground">alex@roseui.com</span>.</p>
        </div>
      </div>

      {verified ? (
        <div className="grid justify-items-center gap-3 rounded-lg border border-dashed p-8 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><IconCheck aria-hidden="true" /></span>
          <p className="font-medium">Email address verified</p>
          <Button type="button" variant="outline" size="sm" onClick={() => { setVerified(false); setCode(""); }}>Try again</Button>
        </div>
      ) : (
        <>
          <div className="grid justify-items-center gap-3 py-4">
            <InputOtp value={code} onChange={setCode} aria-label="Email verification code" groupEvery={3} />
            {resent && <p className="text-xs text-muted-foreground">A new code was sent.</p>}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button type="button" variant="ghost" onClick={() => { setResent(true); setCode(""); }}>
              <IconRefresh aria-hidden="true" />
              Resend code
            </Button>
            <Button type="button" disabled={code.length !== 6} onClick={() => setVerified(true)}>
              Verify code <IconArrowRight aria-hidden="true" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export function BackupCodesExample() {
  const [saved, setSaved] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const { copied, copy } = useCopyFeedback();
  const codes = backupCodes.join("\n");

  if (enabled) {
    return (
      <div className="grid justify-items-center gap-3 py-10 text-center">
        <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><IconShieldCheck aria-hidden="true" className="size-6" /></span>
        <p className="font-medium">Backup codes are ready</p>
        <p className="text-sm text-muted-foreground">Each code can be used once to recover your account.</p>
        <Button type="button" variant="outline" size="sm" onClick={() => { setEnabled(false); setSaved(false); }}>Generate again</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><IconKey aria-hidden="true" className="size-5" /></span>
        <div>
          <h2 className="font-semibold tracking-tight">Save backup codes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Keep these one-time codes somewhere secure before continuing.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 rounded-lg border bg-muted/30 p-4 font-mono text-sm tabular-nums">
        {backupCodes.map((code) => <span key={code}>{code}</span>)}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => downloadText("roseui-backup-codes.txt", `RoseUI backup codes\n\n${codes}\n`)}>
          <IconDownload aria-hidden="true" />
          Download
        </Button>
        <CopyButton value={codes} kind="backup" copied={copied} onCopy={copy} />
      </div>
      <label className="flex items-start gap-3 text-sm">
        <Checkbox checked={saved} onCheckedChange={(value) => setSaved(value === true)} />
        <span>I have saved these backup codes in a secure place.</span>
      </label>
      <Button type="button" className="w-full" disabled={!saved} onClick={() => setEnabled(true)}>Continue</Button>
    </div>
  );
}

export function RecoveryPhraseExample() {
  const [saved, setSaved] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const { copied, copy } = useCopyFeedback();
  const phrase = recoveryWords.join(" ");

  if (enabled) {
    return (
      <div className="grid justify-items-center gap-3 py-10 text-center">
        <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground"><IconShieldCheck aria-hidden="true" className="size-6" /></span>
        <p className="font-medium">Recovery phrase saved</p>
        <p className="text-sm text-muted-foreground">Keep it offline and never share it with anyone.</p>
        <Button type="button" variant="outline" size="sm" onClick={() => { setEnabled(false); setSaved(false); }}>Show phrase again</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><IconShieldCheck aria-hidden="true" className="size-5" /></span>
        <div>
          <h2 className="font-semibold tracking-tight">Write down your recovery phrase</h2>
          <p className="mt-1 text-sm text-muted-foreground">This phrase is the last resort for recovering your account.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg border bg-muted/30 p-4 text-sm sm:grid-cols-3">
        {recoveryWords.map((word, index) => (
          <span key={word} className="flex gap-2 rounded-md border bg-background px-2 py-1.5">
            <span className="text-muted-foreground">{index + 1}.</span>
            <span className="font-medium">{word}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => downloadText("roseui-recovery-phrase.txt", `RoseUI recovery phrase\n\n${phrase}\n`)}>
          <IconDownload aria-hidden="true" />
          Download
        </Button>
        <CopyButton value={phrase} kind="recovery" copied={copied} onCopy={copy} />
      </div>
      <label className="flex items-start gap-3 text-sm">
        <Checkbox checked={saved} onCheckedChange={(value) => setSaved(value === true)} />
        <span>I wrote down all 12 words and will keep this phrase private.</span>
      </label>
      <Button type="button" className="w-full" disabled={!saved} onClick={() => setEnabled(true)}>Continue</Button>
    </div>
  );
}
