"use client"

import * as React from "react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { RulerSlider } from "@/components/ui/ruler-slider"

export function RulerSliderExamples() {
  const [threshold, setThreshold] = React.useState(12500)
  const [retention, setRetention] = React.useState(30)
  return <>
    <ComponentPreview previewId="ruler-slider-01" title="Approval threshold" layout="fullStack"><RulerSlider label="Invoice approval threshold" min={0} max={50000} step={250} majorEvery={4} value={threshold} onValueChange={setThreshold} onValueCommit={setThreshold} formatValue={(value) => `$${value.toLocaleString()}`} /><p className="text-xs text-muted-foreground">Invoices above this amount require an additional review.</p></ComponentPreview>
    <ComponentPreview previewId="ruler-slider-02" title="Record retention" layout="fullStack"><RulerSlider label="Retention period" min={7} max={365} step={1} majorEvery={14} value={retention} onValueChange={setRetention} unit=" days" /><p className="text-xs text-muted-foreground">Changes apply to new records in this workspace.</p></ComponentPreview>
  </>
}
