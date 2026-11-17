"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { TextField } from "@/components/roseui/text-field";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { type Key, type Selection, Tag, TagGroup, TagList } from "./tag-group";

export interface InputTagProps {
  value?: Selection;
  onChange?: (next: Selection) => void;
  defaultValue?: string[];
  splitPattern?: RegExp;
  className?: string;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  required?: boolean;
  requiredMessage?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function InputTag({
  value,
  onChange,
  defaultValue = [],
  splitPattern = /[,;]/,
  className,
  inputValue: controlledInput,
  onInputValueChange,
  required,
  requiredMessage,
  name = "tags",
  children,
  disabled,
  readOnly,
  ...props
}: InputTagProps) {
  const [internalSelection, setInternalSelection] = useState<Selection>(new Set(defaultValue));
  const [uncontrolledInput, setUncontrolledInput] = useState("");
  const [touched, setTouched] = useState(false);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const selection = value ?? internalSelection;
  const inputValue = controlledInput ?? uncontrolledInput;
  const setInputValue = onInputValueChange ?? setUncontrolledInput;
  const list = useMemo(() => (selection === "all" ? [] : Array.from(selection, String)), [selection]);
  const invalid = Boolean(required && list.length === 0 && touched);
  const errorText = requiredMessage ?? "At least one item is required";

  useEffect(() => {
    const input = hiddenRef.current;
    const form = input?.form;
    if (!form || !input) return;
    const onSubmit = (event: Event) => {
      if (required && list.length === 0) {
        event.preventDefault();
        setTouched(true);
        input.setCustomValidity(errorText);
        form.reportValidity();
      } else input.setCustomValidity("");
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [required, list.length, errorText]);

  function updateSelection(next: Selection) {
    if (value === undefined) setInternalSelection(next);
    onChange?.(next);
  }
  function addTag() {
    if (selection === "all" || disabled || readOnly) return;
    const next = new Set<Key>(selection);
    inputValue.split(splitPattern).forEach((raw) => {
      const formatted = raw
        .trim()
        .replace(/\s\s+/g, " ")
        .replace(/\t|\\t|\r|\\r|\n|\\n/g, "");
      if (formatted && ![...next].some((id) => String(id).toLocaleLowerCase() === formatted.toLocaleLowerCase()))
        next.add(formatted);
    });
    updateSelection(next);
    setInputValue("");
    setTouched(true);
  }
  function removeKeys(keys: Set<Key>) {
    if (selection === "all" || disabled || readOnly) return;
    const next = new Set<Key>(selection);
    keys.forEach((key) => next.delete(key));
    updateSelection(next);
    setTouched(true);
  }
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <TextField
        value={inputValue}
        onChange={setInputValue}
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={() => setTouched(true)}
        onKeyDown={(event) => {
          if (["Enter", ",", ";"].includes(event.key)) {
            event.preventDefault();
            addTag();
          }
        }}
        {...props}
      >
        {children}
        <FieldError>{invalid ? errorText : undefined}</FieldError>
      </TextField>
      {list.length > 0 ? (
        <TagGroup aria-label="Selected tags" disabled={disabled} onRemove={removeKeys} className="mt-1">
          <TagList>
            {list.map((id) => (
              <Tag key={id} id={id}>
                {id}
              </Tag>
            ))}
          </TagList>
        </TagGroup>
      ) : null}
      <input
        ref={hiddenRef}
        name={name}
        value={list.join(",")}
        required={Boolean(required)}
        readOnly
        aria-hidden="true"
        tabIndex={-1}
        className="sr-only absolute -z-10 h-0 w-0 opacity-0"
      />
    </div>
  );
}
