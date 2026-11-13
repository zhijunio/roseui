"use client";
import * as React from "react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/composite-field";
import { InputPhone } from "@/components/ui/input-phone";
import { ComponentPreview } from "@/examples/component-preview";

const examples = [
  "Basic phone input",
  "Small phone input",
  "Large phone input",
  "Disabled phone input",
  "Phone input with preset value",
  "Phone input with error state",
  "Phone input with specific default country",
  "Read-only phone input",
];

function PhoneDemo({ index }: { index: number }) {
  const initial: React.ComponentProps<typeof InputPhone>["value"] =
    index === 1
      ? "+31612345678"
      : index === 2
        ? "+12125550198"
        : index === 4
          ? "+14155550148"
          : index === 7
            ? "+442079460123"
            : undefined;
  const [value, setValue] = React.useState<React.ComponentProps<typeof InputPhone>["value"]>(initial);
  if (index === 0)
    return (
      <Field className="max-w-sm">
        <FieldLabel htmlFor="phone-basic">Phone number</FieldLabel>
        <InputPhone
          inputProps={{ id: "phone-basic" }}
          defaultCountry="US"
          placeholder="Enter phone number"
          value={value}
          onValueChange={setValue}
        />
        <FieldDescription>Choose a country or enter an international calling code.</FieldDescription>
      </Field>
    );
  if (index === 1)
    return (
      <Field className="max-w-sm">
        <FieldLabel htmlFor="phone-small">Contact number</FieldLabel>
        <InputPhone
          inputProps={{ id: "phone-small" }}
          size="sm"
          defaultCountry="NL"
          value={value}
          onValueChange={setValue}
        />
      </Field>
    );
  if (index === 2)
    return (
      <Field className="max-w-md">
        <FieldLabel htmlFor="phone-large">Office phone</FieldLabel>
        <InputPhone
          inputProps={{ id: "phone-large" }}
          size="lg"
          defaultCountry="US"
          value={value}
          onValueChange={setValue}
        />
      </Field>
    );
  if (index === 3)
    return (
      <Field className="max-w-sm">
        <FieldLabel htmlFor="phone-disabled">Phone number</FieldLabel>
        <InputPhone inputProps={{ id: "phone-disabled" }} disabled placeholder="Unavailable" />
      </Field>
    );
  if (index === 4)
    return (
      <Field className="max-w-sm">
        <FieldLabel htmlFor="phone-preset">Existing contact</FieldLabel>
        <InputPhone inputProps={{ id: "phone-preset" }} value={value} onValueChange={setValue} />
        <FieldDescription>The country is inferred from the stored international number.</FieldDescription>
      </Field>
    );
  if (index === 5)
    return (
      <Field className="max-w-sm" invalid>
        <FieldLabel htmlFor="phone-invalid">Mobile number</FieldLabel>
        <InputPhone
          inputProps={{ id: "phone-invalid" }}
          defaultCountry="US"
          invalid
          placeholder="Enter phone number"
          aria-invalid="true"
        />
        <FieldDescription className="text-destructive">Enter a valid contact number.</FieldDescription>
      </Field>
    );
  if (index === 6)
    return (
      <Field className="max-w-sm">
        <FieldLabel htmlFor="phone-france">France phone number</FieldLabel>
        <InputPhone inputProps={{ id: "phone-france" }} defaultCountry="FR" placeholder="06 12 34 56 78" />
        <FieldDescription>New numbers begin with the selected country.</FieldDescription>
      </Field>
    );
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-readonly">Account contact</FieldLabel>
      <InputPhone inputProps={{ id: "phone-readonly" }} value={value} readOnly />
      <FieldDescription>This saved number can be focused and copied.</FieldDescription>
    </Field>
  );
}

export function InputPhoneExamples() {
  return (
    <>
      {examples.map((title, index) => (
        <ComponentPreview key={title} title={title}>
          <PhoneDemo index={index} />
        </ComponentPreview>
      ))}
    </>
  );
}
