"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ClearInput } from "@/components/ui/clear-input";
import { Label } from "@/components/ui/label";

export function ClearInputExamples() {
  const [search, setSearch] = useState("quarterly report");
  const [email, setEmail] = useState("");
  const [lastCleared, setLastCleared] = useState("");

  return (
    <>
      <ComponentPreview title="Clearable search" layout="field">
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="clear-search">Search</Label>
          <ClearInput
            id="clear-search"
            value={search}
            onValueChange={setSearch}
            onClear={() => setLastCleared("Search")}
            placeholder="Search documents"
          />
          <p aria-live="polite" className="text-muted-foreground text-xs">
            {lastCleared
              ? `${lastCleared} cleared. Focus returned to the input.`
              : "The clear button returns focus to the input."}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Empty and disabled" layout="field">
        <div className="grid w-full max-w-sm gap-4">
          <div className="grid gap-2">
            <Label htmlFor="clear-email">Email</Label>
            <ClearInput
              id="clear-email"
              type="email"
              value={email}
              onValueChange={setEmail}
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="clear-disabled" isDisabled>
              Account ID
            </Label>
            <ClearInput id="clear-disabled" value="ACC-1042" onValueChange={() => {}} disabled />
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
