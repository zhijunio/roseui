"use client";

import { useState } from "react";

import { IconDeviceLaptop, IconDeviceMobile } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { HoldToConfirm } from "@/components/ui/hold-to-confirm";
import { PasswordField } from "@/components/ui/password-field";

export function SecuritySettingsExample() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [revoked, setRevoked] = useState<string[]>([]);
  const reduced = useReducedMotion();
  const sessions = [
    { device: "MacBook Pro", detail: "Chrome 129 · San Francisco, US · Active now", current: true },
    { device: "iPhone 15 Pro", detail: "Fieldnote for iOS · San Francisco, US · 2 hours ago", current: false },
    { device: "Windows desktop", detail: "Edge 128 · Austin, US · Yesterday at 4:12 PM", current: false },
    { device: "iPad Air", detail: "Safari 18 · Lisbon, PT · Sep 14", current: false },
    { device: "ThinkPad X1", detail: "Firefox 130 · Berlin, DE · Sep 9", current: false },
  ];

  return (
    <section
      aria-labelledby="security-card-title"
      className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm"
    >
      <header className="border-border border-b p-5 sm:p-6">
        <h2 id="security-card-title" className="text-base font-medium">
          Security
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Control how you sign in to Fieldnote as maya@fieldnote.example.
        </p>
      </header>
      <div className="divide-border divide-y">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h3 className="text-sm font-medium">Two-factor authentication</h3>
            <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
              Ask for a code from your authenticator app when you sign in on a new device.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-muted text-muted-foreground rounded-md px-2.5 py-1 text-sm">
              {twoFactor ? "On" : "Off"}
            </span>
            <Button
              className="rounded-full"
              size="lg"
              onClick={() => {
                setTwoFactor((value) => !value);
                setStatus(twoFactor ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
              }}
            >
              {twoFactor ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <h3 className="text-sm font-medium">Password</h3>
            <p className="text-muted-foreground mt-1 text-sm">Last changed March 4, 2026</p>
          </div>
          <Button className="rounded-full" variant="outline" onClick={() => setPasswordOpen((value) => !value)}>
            {passwordOpen ? "Close" : "Change password"}
          </Button>
        </div>
        <AnimatePresence initial={false}>
          {passwordOpen ? (
            <motion.form
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.2 }}
              onSubmit={(event) => {
                event.preventDefault();
                setPasswordOpen(false);
                setStatus("Password updated");
              }}
              className="bg-muted/20 grid gap-4 overflow-hidden p-5 sm:p-6"
            >
              <PasswordField id="security-current" label="Current password" />
              <PasswordField id="security-new" label="New password" autoComplete="new-password" />
              <PasswordField id="security-confirm" label="Confirm new password" autoComplete="new-password" />
              <Button type="submit" className="w-fit rounded-full">
                Update password
              </Button>
            </motion.form>
          ) : null}
        </AnimatePresence>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="text-sm font-medium">
                Active sessions <span className="text-muted-foreground ml-1">{sessions.length}</span>
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Devices signed in to your account in the last 30 days.
              </p>
            </div>
          </div>
          <div className="divide-border mt-4 divide-y">
            {sessions
              .filter((session) => !revoked.includes(session.device))
              .map((session) => {
                const DeviceIcon = session.device === "iPhone 15 Pro" ? IconDeviceMobile : IconDeviceLaptop;
                return (
                  <div key={session.device} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="bg-muted grid size-8 shrink-0 place-items-center rounded-md" aria-hidden="true">
                      <DeviceIcon className="text-muted-foreground size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {session.device}
                        {session.current ? (
                          <span className="bg-muted text-muted-foreground ml-2 rounded-md px-2 py-0.5 text-xs font-normal">
                            This device
                          </span>
                        ) : null}
                      </p>
                      <p className="text-muted-foreground mt-1 truncate text-xs">{session.detail}</p>
                    </div>
                    {!session.current ? (
                      <Button
                        className="rounded-full"
                        variant="ghost"
                        onClick={() => {
                          setRevoked((value) => [...value, session.device]);
                          setStatus(`${session.device} revoked`);
                        }}
                      >
                        Revoke
                      </Button>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <p className="text-muted-foreground mt-4 text-xs">You stay signed in on this device</p>
          <HoldToConfirm
            className="mt-3 rounded-full"
            variant="outline"
            label="Sign out of other sessions"
            confirmedLabel="Other sessions signed out"
            duration={1200}
            onConfirm={() => {
              setRevoked(sessions.filter((session) => !session.current).map((session) => session.device));
              setStatus("Other sessions signed out");
            }}
          />
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </section>
  );
}
