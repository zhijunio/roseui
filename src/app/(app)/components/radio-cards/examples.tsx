"use client"

import * as React from "react"
import { IconBuilding, IconRocket, IconUsers } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { RadioCards } from "@/components/composite/radio-cards"

function WorkspacePlanExample() {
  const [plan, setPlan] = React.useState("team")
  return <div className="grid w-full gap-3"><RadioCards aria-label="Workspace plan" name="workspace-plan" value={plan} onValueChange={setPlan} options={[
    { value: "starter", label: "Starter", description: "Core project tools for a small workspace.", meta: "$12 / seat", icon: <IconRocket /> },
    { value: "team", label: "Team", description: "Shared reports, approvals, and team roles.", meta: "$28 / seat", icon: <IconUsers /> },
    { value: "enterprise", label: "Enterprise", description: "Custom controls for larger organizations.", meta: "Contact sales", icon: <IconBuilding /> },
    { value: "legacy", label: "Legacy plan", meta: "$18 / seat", disabled: true, disabledReason: "This plan is unavailable for new workspaces." },
  ]} /><output aria-live="polite" className="text-xs text-muted-foreground">Selected plan: {plan}</output></div>
}

export function RadioCardsExamples() {
  return <>
    <ComponentPreview previewId="radio-cards-01" title="Workspace plans" layout="fullStack"><WorkspacePlanExample /></ComponentPreview>
    <ComponentPreview previewId="radio-cards-02" title="Delivery preference" layout="fullStack"><RadioCards aria-label="Delivery preference" defaultValue="standard" layout="list" options={[
      { value: "standard", label: "Standard", description: "Available during regular business hours.", meta: "Included" },
      { value: "priority", label: "Priority", description: "For time-sensitive order updates.", meta: "$6 / month" },
      { value: "weekend", label: "Weekend", description: "Receive selected updates on weekends.", meta: "$3 / month" },
    ]} /></ComponentPreview>
  </>
}
