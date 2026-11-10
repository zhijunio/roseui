"use client"

import { useState } from "react"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { Gauge } from "@/components/ui/gauge"
import { Button } from "@/components/ui/button"

const MIN_VALUE = 0
const MAX_VALUE = 100
const STEP = 1

export function GaugeExamples() {
  const [value, setValue] = useState(72)
  const checksPassing = Math.round((value / MAX_VALUE) * 20)

  return (
    <ComponentPreview previewId="gauge-chart-01" title="Workspace health" layout="fullStack" span={2} density="chart">
      <div className="grid justify-items-center gap-3">
        <Gauge
          label="Workspace health"
          value={value}
          detail={`${checksPassing} of 20 checks passing`}
          thresholds={[
            { from: 0, tone: "success", label: "Healthy" },
            { from: 80, tone: "warning", label: "Filling up" },
            { from: 90, tone: "danger", label: "Critical" },
          ]}
        />
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-full"
            aria-label="Lower workspace health"
            disabled={value <= MIN_VALUE}
            onClick={() => setValue(current => Math.max(MIN_VALUE, current - STEP))}
          >
            <IconMinus aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            className="rounded-full"
            aria-label="Raise workspace health"
            disabled={value >= MAX_VALUE}
            onClick={() => setValue(current => Math.min(MAX_VALUE, current + STEP))}
          >
            <IconPlus aria-hidden="true" />
          </Button>
        </div>
      </div>
    </ComponentPreview>
  )
}
