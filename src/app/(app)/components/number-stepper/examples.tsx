"use client";

import { useState } from "react";
import { IconMinus, IconPlus, IconUsers } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { NumberStepper } from "@/components/composite/number-stepper";
import { ComponentPreview } from "@/components/composite/component-preview";

export function NumberStepperExamples() {
  const [guests, setGuests] = useState(2);
  const [quantity, setQuantity] = useState(5);

  return (
    <>
      <ComponentPreview previewId="number-stepper-01" title="Guest Picker" layout="panel">
        <div className="grid gap-2">
          <p id="guest-count-label" className="text-sm font-medium">Guests</p>
          <NumberStepper aria-labelledby="guest-count-label" minValue={1} maxValue={8} value={guests} onChange={setGuests} incrementIcon={<IconPlus aria-hidden="true" className="size-4" />} decrementIcon={<IconMinus aria-hidden="true" className="size-4" />} />
          <p className="text-xs text-muted-foreground">Rooms and rates for {guests} guests.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-02" title="Controlled Value" layout="panel">
        <div className="grid gap-3">
          <NumberStepper aria-label="Order quantity" minValue={0} maxValue={20} value={quantity} onChange={setQuantity} />
          <output aria-live="polite" className="text-xs text-muted-foreground">Quantity: {quantity}</output>
          <div className="flex gap-2"><Button type="button" variant="link" size="xs" onClick={() => setQuantity(0)}>Reset</Button><Button type="button" variant="link" size="xs" onClick={() => setQuantity(10)}>Set to 10</Button></div>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-03" title="Sizes" layout="panel">
        <div className="flex flex-wrap items-center gap-3"><NumberStepper aria-label="Small quantity" size="sm" defaultValue={2} /><NumberStepper aria-label="Default quantity" defaultValue={4} /><NumberStepper aria-label="Large quantity" size="lg" defaultValue={6} /></div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-04" title="Step and Bounds" layout="panel">
        <div className="grid gap-3"><NumberStepper aria-label="Quantity in increments of five" minValue={0} maxValue={50} step={5} defaultValue={10} /><p className="text-xs text-muted-foreground">Changes in steps of 5, from 0 to 50.</p></div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-05" title="Reversed Controls" layout="panel">
        <div className="flex flex-wrap items-center gap-4"><NumberStepper aria-label="Team size" minValue={1} maxValue={12} defaultValue={4} reversed incrementLabel="Add team member" decrementLabel="Remove team member" /><span className="text-sm text-muted-foreground">Team size</span></div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-06" title="Formatted Value" layout="panel">
        <div className="grid gap-3"><NumberStepper aria-label="Budget adjustment" minValue={0} step={25} defaultValue={1250} formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} /><p className="text-xs text-muted-foreground">Adjust the budget in $25 increments.</p></div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-07" title="Disabled" layout="panel">
        <div className="grid gap-3"><NumberStepper aria-label="Unavailable seats" value={12} isDisabled /><p className="text-xs text-muted-foreground">This seat count is managed by your organization.</p></div>
      </ComponentPreview>
      <ComponentPreview previewId="number-stepper-08" title="Custom Button Icons" layout="panel">
        <div className="grid gap-3"><NumberStepper aria-label="Team members" defaultValue={3} minValue={0} maxValue={10} incrementIcon={<IconUsers aria-hidden="true" className="size-4" />} decrementIcon={<IconMinus aria-hidden="true" className="size-4" />} incrementLabel="Add team member" decrementLabel="Remove team member" /><p className="text-xs text-muted-foreground">The increase action uses a team icon.</p></div>
      </ComponentPreview>
    </>
  );
}
