"use client";

import { useState } from "react";

type UseControlledStateOptions<T> = {
  value: T | undefined;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControlledState<T>({ value, defaultValue, onChange }: UseControlledStateOptions<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = value !== undefined ? value : internalValue;

  function setValue(nextValue: T) {
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return [currentValue, setValue] as const;
}
