"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/composite-field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentPreview } from "@/examples/component-preview";

function NativeValidationExample() {
  const [submitted, setSubmitted] = React.useState("");

  return (
    <Form
      className="grid w-full max-w-sm gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(new FormData(event.currentTarget).get("workEmail")?.toString() ?? "");
      }}
      onReset={() => setSubmitted("")}
    >
      <Field>
        <FieldLabel htmlFor="form-native-email">Work email</FieldLabel>
        <Input id="form-native-email" name="workEmail" type="email" placeholder="you@company.com" required />
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" type="submit">
          Continue
        </Button>
        <Button size="sm" type="reset" variant="outline">
          Reset
        </Button>
        {submitted && (
          <span className="text-muted-foreground text-sm" role="status">
            Submitted for {submitted}
          </span>
        )}
      </div>
    </Form>
  );
}

function AriaValidationExample() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const errorId = React.useId();
  const invalid = submitted && !email.includes("@");

  return (
    <Form
      className="grid w-full max-w-sm gap-3"
      validationBehavior="aria"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      onReset={() => {
        setEmail("");
        setSubmitted(false);
      }}
    >
      <Field invalid={invalid}>
        <FieldLabel htmlFor="form-aria-email">Work email</FieldLabel>
        <Input
          id="form-aria-email"
          name="workEmail"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
        />
        {invalid && <FieldError id={errorId}>Enter an email address that includes @.</FieldError>}
      </Field>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" type="submit">
          Continue
        </Button>
        <Button size="sm" type="reset" variant="outline">
          Reset
        </Button>
        {submitted && !invalid && (
          <span className="text-muted-foreground text-sm" role="status">
            Email accepted.
          </span>
        )}
      </div>
    </Form>
  );
}

function GroupedFieldsExample() {
  const [submitted, setSubmitted] = React.useState("");

  return (
    <Form
      aria-label="Contact details"
      className="grid w-full max-w-sm gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setSubmitted(`${data.get("firstName")} ${data.get("lastName")}`);
      }}
      onReset={() => setSubmitted("")}
    >
      <FieldSet className="gap-3">
        <FieldLegend variant="label">Contact details</FieldLegend>
        <Field>
          <FieldLabel htmlFor="form-first-name">First name</FieldLabel>
          <Input id="form-first-name" name="firstName" autoComplete="given-name" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-last-name">Last name</FieldLabel>
          <Input id="form-last-name" name="lastName" autoComplete="family-name" required />
        </Field>
      </FieldSet>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" type="submit">
          Save contact
        </Button>
        <Button size="sm" type="reset" variant="outline">
          Reset
        </Button>
        {submitted && (
          <span className="text-muted-foreground text-sm" role="status">
            Saved for {submitted}.
          </span>
        )}
      </div>
    </Form>
  );
}

function ServerValidationExample() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [summary, setSummary] = React.useState("");
  const usernameErrorId = React.useId();
  const emailErrorId = React.useId();

  function clearErrors() {
    setErrors({});
    setSummary("");
  }

  return (
    <Form
      aria-label="Create workspace account"
      className="grid w-full max-w-sm gap-3"
      validationBehavior="aria"
      validationErrors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username")?.toString().trim() ?? "";
        const email = data.get("accountEmail")?.toString().trim() ?? "";
        const nextErrors: Record<string, string> = {};

        if (!username) nextErrors.username = "Enter a username.";
        else if (username.toLowerCase() === "taken") nextErrors.username = "This username is already in use.";
        if (!email.includes("@")) nextErrors.accountEmail = "Enter a valid email address.";

        setErrors(nextErrors);
        setSummary(
          Object.keys(nextErrors).length
            ? "The account could not be created. Review the errors below."
            : "Account created successfully.",
        );
      }}
      onReset={clearErrors}
    >
      {summary && (
        <FieldError role="alert" aria-live="assertive">
          {summary}
        </FieldError>
      )}
      <Field invalid={Boolean(errors.username)}>
        <FieldLabel htmlFor="form-server-username">Username</FieldLabel>
        <Input
          id="form-server-username"
          name="username"
          autoComplete="username"
          aria-invalid={Boolean(errors.username) || undefined}
          aria-describedby={errors.username ? usernameErrorId : undefined}
          onChange={clearErrors}
        />
        {errors.username && <FieldError id={usernameErrorId}>{errors.username}</FieldError>}
      </Field>
      <Field invalid={Boolean(errors.accountEmail)}>
        <FieldLabel htmlFor="form-server-email">Email</FieldLabel>
        <Input
          id="form-server-email"
          name="accountEmail"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.accountEmail) || undefined}
          aria-describedby={errors.accountEmail ? emailErrorId : undefined}
          onChange={clearErrors}
        />
        {errors.accountEmail && <FieldError id={emailErrorId}>{errors.accountEmail}</FieldError>}
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" type="submit">
          Create account
        </Button>
        <Button size="sm" type="reset" variant="outline">
          Reset
        </Button>
      </div>
    </Form>
  );
}

export function FormExamples() {
  return (
    <>
      <ComponentPreview title="Native required-field validation" layout="stack">
        <NativeValidationExample />
      </ComponentPreview>
      <ComponentPreview title="Custom field errors on submit" layout="stack">
        <AriaValidationExample />
      </ComponentPreview>
      <ComponentPreview title="Grouped contact fields" layout="stack">
        <GroupedFieldsExample />
      </ComponentPreview>
      <ComponentPreview title="Duplicate username and form-level errors" layout="stack">
        <ServerValidationExample />
      </ComponentPreview>
    </>
  );
}
