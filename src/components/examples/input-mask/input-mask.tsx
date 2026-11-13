"use client";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/composite-field";
import { MaskInput } from "@/components/ui/mask-input";
import { ComponentPreview } from "@/examples/component-preview";

export function InputMaskExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Phone Number">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="masked-phone">Phone number</FieldLabel>
          <MaskInput id="masked-phone" mask="(999) 999-9999" placeholder="(555) 123-4567" />
          <FieldDescription>Enter a 10-digit phone number.</FieldDescription>
        </Field>
      </ComponentPreview>
      <ComponentPreview title="Date">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="masked-date">Date</FieldLabel>
          <MaskInput id="masked-date" mask="99/99/9999" placeholder="MM/DD/YYYY" />
          <FieldDescription>Use month, day, and year.</FieldDescription>
        </Field>
      </ComponentPreview>
      <ComponentPreview title="Postal Code">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="masked-postal">Postal code</FieldLabel>
          <MaskInput id="masked-postal" mask="99999-9999" placeholder="12345-6789" />
          <FieldDescription>ZIP+4 format.</FieldDescription>
        </Field>
      </ComponentPreview>
    </div>
  );
}
