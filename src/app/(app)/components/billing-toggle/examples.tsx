"use client"

import * as React from "react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { BillingPrice, BillingToggle } from "@/components/composite/billing-toggle"

const plans = [
  { name: "Starter", monthly: 12, yearly: 10, description: "For a small team organizing its work." },
  { name: "Growth", monthly: 28, yearly: 23, description: "For teams managing several workflows." },
  { name: "Scale", monthly: 64, yearly: 54, description: "For organizations with advanced controls." },
]

function PlansExample() {
  const [period, setPeriod] = React.useState("monthly")
  const yearly = period === "yearly"
  return <section className="w-full overflow-hidden rounded-2xl border bg-card">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 sm:px-6">
      <div><h3 className="text-base font-semibold">Workspace plans</h3><p className="mt-1 text-sm text-muted-foreground">Choose the right plan for your team.</p></div>
      <BillingToggle value={period} onValueChange={setPeriod} size="md" />
    </header>
    <div className="divide-y px-5 sm:px-6">{plans.map((plan, index) => <article key={plan.name} className="flex flex-wrap items-center justify-between gap-4 py-5">
      <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h4 className="font-medium">{plan.name}</h4>{yearly && index === 1 && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Save 18%</span>}</div><p className="mt-1 max-w-md text-sm leading-5 text-muted-foreground">{plan.description}</p></div>
      <div className="min-w-[170px] text-right"><BillingPrice amount={yearly ? plan.yearly : plan.monthly} currency="USD" was={yearly ? plan.monthly : undefined} period={yearly ? "/ month, billed yearly" : "/ month"} /></div>
    </article>)}</div>
    <p className="border-t px-5 py-3 text-xs text-muted-foreground sm:px-6">All plans include secure workspaces and standard support.</p>
  </section>
}

export function BillingToggleExamples() {
  return <>
    <ComponentPreview previewId="billing-toggle-01" title="Subscription plans" layout="fullStack"><PlansExample /></ComponentPreview>
    <ComponentPreview previewId="billing-toggle-02" title="Compact billing choice" exampleLabels={["Small", "Large"]}><BillingToggle value="monthly" onValueChange={() => undefined} size="md" /><BillingToggle value="yearly" onValueChange={() => undefined} size="lg" /></ComponentPreview>
  </>
}
