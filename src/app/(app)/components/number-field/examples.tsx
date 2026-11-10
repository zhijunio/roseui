"use client";
import { useState } from "react";
import { NumberField } from "@/components/composite/number-field";
import { ComponentPreview } from "@/components/composite/component-preview";
import { FieldError } from "@/components/composite/field";

export function NumberFieldExamples() {
  const [seats, setSeats] = useState(8);
  const [budget, setBudget] = useState(1250);
  const [conversionRate, setConversionRate] = useState(0.25);
  const [weight, setWeight] = useState(4.5);

  return (
    <>

    <ComponentPreview previewId="number-field-01" title="Controlled Value and Limits">
      <div className="grid gap-2">
        <NumberField aria-label="Seats" min={1} max={25} value={seats} onValueChange={setSeats} />
        <p className="text-xs text-muted-foreground" aria-live="polite">{seats} seats selected</p>
      </div>
    </ComponentPreview>
    <ComponentPreview previewId="number-field-02" title="Sizes and Step Values" layout="panel">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-3"><NumberField aria-label="Small field" size="sm" defaultValue={2} /><NumberField aria-label="Default field" defaultValue={5} /><NumberField aria-label="Large field" size="lg" defaultValue={8} /></div>
        <div className="grid gap-3"><NumberField aria-label="Step 1" defaultValue={1} step={1} /><NumberField aria-label="Step 5" defaultValue={5} step={5} /><NumberField aria-label="Step 10" defaultValue={10} step={10} /></div>
      </div>
    </ComponentPreview>
    <ComponentPreview previewId="number-field-03" title="Stepper Layout and Read Only" layout="panel">
      <div className="flex flex-wrap items-center gap-4">
        <NumberField aria-label="Guests" layout="right" min={1} max={12} defaultValue={4} />
        <NumberField aria-label="Read-only quantity" value={3} readOnly />
      </div>
    </ComponentPreview>
    <ComponentPreview previewId="number-field-04" title="Disabled and Invalid States" layout="panel">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2"><label htmlFor="locked-value" className="text-sm font-medium">Locked value</label><NumberField id="locked-value" value={12} disabled /></div>
        <div className="grid gap-2"><label htmlFor="order-quantity" className="text-sm font-medium">Order quantity</label><NumberField id="order-quantity" aria-invalid="true" aria-describedby="order-error" min={1} max={3} defaultValue={5} /><FieldError id="order-error">Only 3 items are available.</FieldError></div>
      </div>
    </ComponentPreview>
    <ComponentPreview previewId="number-field-05" title="Currency, Percentage, and Unit Formatting" span={2} layout="panel">
      <div className="grid w-full gap-4 sm:grid-cols-3">
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="monthly-budget">Monthly budget</label>
          <NumberField
            id="monthly-budget"
            min={0}
            step={25}
            value={budget}
            onValueChange={setBudget}
            formatOptions={{ style: "currency", currency: "USD" }}
          />
        </div>
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="conversion-rate">Conversion rate</label>
          <NumberField
            id="conversion-rate"
            min={0}
            max={1}
            step={0.01}
            value={conversionRate}
            onValueChange={setConversionRate}
            formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
          />
        </div>
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="package-weight">Package weight</label>
          <NumberField
            id="package-weight"
            min={0}
            step={0.1}
            value={weight}
            onValueChange={setWeight}
            formatOptions={{ style: "unit", unit: "kilogram", unitDisplay: "short", maximumFractionDigits: 1 }}
          />
        </div>
      </div>
    </ComponentPreview>
    </>
  );
}
