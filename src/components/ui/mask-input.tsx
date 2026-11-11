"use client";

import type { ComponentProps } from "react";
import { useMaskInput, type Mask, type Options } from "use-mask-input";

import { Input } from "@/components/ui/input";

export function MaskInput({ mask, maskOptions, ...inputProps }: Omit<ComponentProps<typeof Input>, "ref"> & {
  mask: Mask;
  maskOptions?: Options;
}) {
  const maskRef = useMaskInput({ mask, options: maskOptions });

  return <Input {...inputProps} ref={maskRef} />;
}
