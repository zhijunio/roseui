"use client";

import * as React from "react";

import { IconCheck, IconSend, IconShieldCheck } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const events = ["invoice.paid", "customer.created", "subscription.updated"];

export function WebhookTesterExample() {
  const [event, setEvent] = React.useState(events[0]);
  const [payload, setPayload] = React.useState('{\n  "id": "evt_01J8Z",\n  "amount": 2400\n}');
  const [secretVisible, setSecretVisible] = React.useState(false);
  const [stage, setStage] = React.useState<"idle" | "signing" | "sent" | "complete">("idle");
  const [responseTab, setResponseTab] = React.useState("response");
  const reduced = useReducedMotion();
  const payloadError = React.useMemo(() => {
    try {
      JSON.parse(payload);
      return "";
    } catch {
      return "JSON must be valid before sending.";
    }
  }, [payload]);
  const send = React.useCallback(() => {
    if (payloadError) return;
    setStage("signing");
    window.setTimeout(() => setStage("sent"), reduced ? 0 : 300);
    window.setTimeout(() => setStage("complete"), reduced ? 0 : 900);
  }, [payloadError, reduced]);
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        send();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [send]);
  const stageIndex = { idle: 0, signing: 1, sent: 2, complete: 3 }[stage];
  return (
    <section className="border-border bg-card mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-sm">
      <header className="border-b p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <IconSend className="text-muted-foreground size-5" />
          Webhook tester
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Send a signed test event to your endpoint and inspect the response.
        </p>
      </header>
      <div className="grid lg:grid-cols-2">
        <div className="grid gap-4 border-b p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="grid gap-1.5">
            <label htmlFor="tester-endpoint" className="text-sm font-medium">
              Endpoint
            </label>
            <Input id="tester-endpoint" defaultValue="https://api.northwind.dev/webhooks/stripe" />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="tester-event" className="text-sm font-medium">
              Event type
            </label>
            <Select
              value={event}
              onValueChange={(value) => {
                setEvent(value);
                setPayload(JSON.stringify({ id: "evt_01J8Z", type: value, amount: 2400 }, null, 2));
                setStage("idle");
              }}
            >
              <SelectTrigger id="tester-event">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {events.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="tester-secret" className="text-sm font-medium">
              Signing secret
            </label>
            <div className="flex gap-2">
              <Input
                id="tester-secret"
                type={secretVisible ? "text" : "password"}
                value="whsec_northwind_demo"
                readOnly
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setSecretVisible((value) => !value)}
                aria-pressed={secretVisible}
              >
                {secretVisible ? "Hide" : "Reveal"}
              </Button>
            </div>
          </div>
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="tester-payload" className="text-sm font-medium">
                JSON payload
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPayload(JSON.stringify({ id: "evt_01J8Z", type: event, amount: 2400 }, null, 2))}
              >
                Format
              </Button>
            </div>
            <Textarea
              id="tester-payload"
              value={payload}
              onChange={(event) => setPayload(event.currentTarget.value)}
              aria-invalid={Boolean(payloadError)}
              aria-describedby={payloadError ? "tester-payload-error" : undefined}
              rows={8}
              className="font-mono text-xs"
            />
            {payloadError && (
              <p id="tester-payload-error" role="alert" className="text-destructive text-xs">
                {payloadError}
              </p>
            )}
          </div>
          <Button
            type="button"
            onClick={send}
            disabled={Boolean(payloadError) || stage === "signing" || stage === "sent"}
          >
            <IconSend />
            {stage === "signing" || stage === "sent" ? "Sending..." : "Send test event"}
            <Kbd className="bg-primary-foreground/15 text-primary-foreground ml-auto">⌘↵</Kbd>
          </Button>
        </div>
        <div className="grid content-start gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Request timeline</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {stage === "complete"
                  ? "Delivered in 184 ms"
                  : stage === "signing"
                    ? "Signing request..."
                    : stage === "sent"
                      ? "Waiting for response..."
                      : "Ready to send"}
              </p>
            </div>
            {stage === "complete" ? (
              <Badge>
                <IconCheck />
                200 OK
              </Badge>
            ) : (
              <Badge variant="secondary">Waiting</Badge>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 1 ? 1 : 0.7,
                y: stageIndex >= 1 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 1 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconShieldCheck className="size-4" />
              </span>
              <span>Signed</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 2 ? 1 : 0.7,
                y: stageIndex >= 2 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 2 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconSend className="size-4" />
              </span>
              <span>Sent</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.7, y: reduced ? 0 : 4 }}
              animate={{
                opacity: stageIndex >= 3 ? 1 : 0.7,
                y: stageIndex >= 3 || reduced ? 0 : 4,
              }}
              className={`rounded-lg border p-3 ${stageIndex >= 3 ? "border-primary/40 bg-primary/5" : ""}`}
            >
              <span className="bg-muted mx-auto mb-2 grid size-7 place-items-center rounded-full">
                <IconCheck className="size-4" />
              </span>
              <span>200 OK</span>
            </motion.div>
          </div>
          <Tabs value={responseTab} onValueChange={setResponseTab}>
            <TabsList>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="request">Request</TabsTrigger>
            </TabsList>
            <TabsContent value="response" className="mt-3">
              <pre className="bg-muted/30 min-h-32 overflow-auto rounded-lg border p-4 text-xs leading-6">
                {stage === "complete"
                  ? `{\n  "received": true,\n  "event": "${event}"\n}`
                  : "Send an event to see the response."}
              </pre>
            </TabsContent>
            <TabsContent value="request" className="mt-3">
              <pre className="bg-muted/30 min-h-32 overflow-auto rounded-lg border p-4 text-xs leading-6">
                POST /webhooks/stripe
                {stage === "complete" ? "\nstripe-signature: t=...,v1=..." : ""}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
