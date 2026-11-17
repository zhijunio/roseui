"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { NumberField, NumberInput } from "@/components/roseui/number-field";
import { FieldError, FieldLabel } from "@/components/ui/field";

export function NumberFieldExamples() {
  const [seats, setSeats] = useState(8);
  const [budget, setBudget] = useState(1250);
  const [conversionRate, setConversionRate] = useState(0.25);
  const [weight, setWeight] = useState(4.5);

  return (
    <>
      <ComponentPreview title="Controlled Value and Limits">
        <div className="grid gap-2">
          <NumberField aria-label="Seats" minValue={1} maxValue={25} value={seats} onChange={setSeats}>
            <NumberInput />
          </NumberField>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {seats} seats selected
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Sizes and Step Values" layout="panel">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-3">
            <NumberField aria-label="Small field" defaultValue={2}>
              <NumberInput size="sm" />
            </NumberField>
            <NumberField aria-label="Default field" defaultValue={5}>
              <NumberInput />
            </NumberField>
            <NumberField aria-label="Large field" defaultValue={8}>
              <NumberInput size="lg" />
            </NumberField>
          </div>
          <div className="grid gap-3">
            <NumberField aria-label="Step 1" defaultValue={1} step={1}>
              <NumberInput />
            </NumberField>
            <NumberField aria-label="Step 5" defaultValue={5} step={5}>
              <NumberInput />
            </NumberField>
            <NumberField aria-label="Step 10" defaultValue={10} step={10}>
              <NumberInput />
            </NumberField>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Stepper Layout and Read Only" layout="panel">
        <div className="flex flex-wrap items-center gap-4">
          <NumberField aria-label="Guests" minValue={1} maxValue={12} defaultValue={4}>
            <NumberInput layout="right" />
          </NumberField>
          <NumberField aria-label="Read-only quantity" value={3} readOnly>
            <NumberInput />
          </NumberField>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled and Invalid States" layout="panel">
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField disabled defaultValue={12}>
            <FieldLabel>Locked value</FieldLabel>
            <NumberInput />
          </NumberField>
          <NumberField invalid minValue={1} maxValue={3} defaultValue={5}>
            <FieldLabel>Order quantity</FieldLabel>
            <NumberInput aria-describedby="order-error" />
            <FieldError id="order-error">Only 3 items are available.</FieldError>
          </NumberField>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Currency, Percentage, and Unit Formatting" span={2} layout="panel">
        <div className="grid w-full gap-4 sm:grid-cols-3">
          <NumberField
            value={budget}
            onChange={setBudget}
            minValue={0}
            step={25}
            formatOptions={{ style: "currency", currency: "USD" }}
          >
            <FieldLabel>Monthly budget</FieldLabel>
            <NumberInput />
          </NumberField>
          <NumberField
            value={conversionRate}
            onChange={setConversionRate}
            minValue={0}
            maxValue={1}
            step={0.01}
            formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
          >
            <FieldLabel>Conversion rate</FieldLabel>
            <NumberInput />
          </NumberField>
          <NumberField
            value={weight}
            onChange={setWeight}
            minValue={0}
            step={0.1}
            formatOptions={{ style: "unit", unit: "kilogram", unitDisplay: "short", maximumFractionDigits: 1 }}
          >
            <FieldLabel>Package weight</FieldLabel>
            <NumberInput />
          </NumberField>
        </div>
      </ComponentPreview>
    </>
  );
}
