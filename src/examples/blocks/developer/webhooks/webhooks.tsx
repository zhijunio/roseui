"use client";

import * as React from "react";

import { IconClock, IconPlus, IconRefresh, IconWebhook } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Delivery = {
  id: number;
  event: string;
  status: "Delivered" | "Failed";
  time: string;
  code: string;
};
const initialDeliveries: Delivery[] = [
  {
    id: 1,
    event: "invoice.paid",
    status: "Delivered",
    time: "2 min ago",
    code: "200",
  },
  {
    id: 2,
    event: "customer.created",
    status: "Failed",
    time: "18 min ago",
    code: "500",
  },
  {
    id: 3,
    event: "subscription.updated",
    status: "Delivered",
    time: "1 hour ago",
    code: "200",
  },
];

export function WebhooksExample() {
  const [deliveries, setDeliveries] = React.useState(initialDeliveries);
  const [endpoint, setEndpoint] = React.useState("https://api.northwind.dev/webhooks");
  const [selected, setSelected] = React.useState(1);
  const [tab, setTab] = React.useState("payload");
  const [adding, setAdding] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const deliveryRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const payload = '{\n  "id": "evt_01J8Z",\n  "type": "invoice.paid",\n  "amount": 2400\n}';

  function retry(id: number) {
    setDeliveries((current) =>
      current.map((delivery) =>
        delivery.id === id ? { ...delivery, status: "Delivered", code: "200", time: "Just now" } : delivery,
      ),
    );
    setStatus("Delivery resolved");
  }
  return (
    <section className="border-border bg-card mx-auto w-full max-w-5xl overflow-hidden rounded-xl border shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <IconWebhook className="text-muted-foreground size-5" />
            Webhooks
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">Inspect events and retry failed deliveries.</p>
        </div>
        <Button onClick={() => setAdding((value) => !value)}>
          <IconPlus />
          Add endpoint
        </Button>
      </header>
      {adding && (
        <form
          className="bg-muted/20 grid gap-3 border-b p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setAdding(false);
            setStatus("Endpoint added");
          }}
        >
          <div className="grid gap-1.5">
            <label htmlFor="webhook-endpoint" className="text-sm font-medium">
              Endpoint URL
            </label>
            <Input
              id="webhook-endpoint"
              value={endpoint}
              onChange={(event) => setEndpoint(event.currentTarget.value)}
            />
          </div>
          <Button type="submit">Save endpoint</Button>
        </form>
      )}
      <div className="grid lg:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.25fr)]">
        <div className="border-b lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-sm font-medium">Recent deliveries</span>
            <Badge variant="secondary">{deliveries.length}</Badge>
          </div>
          <div className="divide-y">
            {deliveries.map((delivery, index) => (
              <button
                key={delivery.id}
                ref={(node) => {
                  deliveryRefs.current[index] = node;
                }}
                type="button"
                aria-current={selected === delivery.id ? "true" : undefined}
                aria-controls="webhook-delivery-detail"
                onClick={() => setSelected(delivery.id)}
                onKeyDown={(event) => {
                  const nextIndex =
                    event.key === "ArrowDown"
                      ? index + 1
                      : event.key === "ArrowUp"
                        ? index - 1
                        : event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? deliveries.length - 1
                            : -1;
                  if (nextIndex >= 0 && nextIndex < deliveries.length) {
                    event.preventDefault();
                    setSelected(deliveries[nextIndex].id);
                    deliveryRefs.current[nextIndex]?.focus();
                  }
                }}
                className="hover:bg-muted/50 aria-[current=true]:bg-muted/70 flex w-full items-center gap-3 p-4 text-left transition-colors"
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${delivery.status === "Delivered" ? "bg-success" : "bg-destructive"}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{delivery.event}</span>
                  <span className="text-muted-foreground mt-1 block text-xs">{delivery.time}</span>
                </span>
                <Badge variant={delivery.status === "Delivered" ? "secondary" : "destructive"}>{delivery.code}</Badge>
              </button>
            ))}
          </div>
        </div>
        <section id="webhook-delivery-detail" aria-live="polite" className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">
                {deliveries.find((delivery) => delivery.id === selected)?.event ?? "Delivery"}
              </p>
              <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                <IconClock className="size-3.5" />
                Received 2 minutes ago
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => retry(selected)}>
              <IconRefresh />
              Retry
            </Button>
          </div>
          <Tabs value={tab} onValueChange={setTab} className="mt-5">
            <TabsList variant="line">
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
            <TabsContent value="payload" className="mt-4">
              <pre className="bg-muted/30 max-h-64 overflow-auto rounded-lg border p-4 text-xs leading-6">
                <code>{payload}</code>
              </pre>
            </TabsContent>
            <TabsContent value="headers" className="mt-4">
              <pre className="bg-muted/30 rounded-lg border p-4 text-xs leading-6">
                content-type: application/json{"\n"}x-signature: sha256=••••••••
              </pre>
            </TabsContent>
          </Tabs>
        </section>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
