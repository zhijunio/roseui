"use client";

import { type ChangeEvent, type ComponentProps, type ReactNode, useRef } from "react";

import { Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";

export type FileTriggerProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "children" | "className" | "onChange" | "onSelect" | "size" | "multiple"
> & {
  children?: ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  disabled?: boolean;
  className?: string;
  onSelect?: (files: FileList | null) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  allowsMultiple?: boolean;
  acceptDirectory?: boolean;
  acceptedFileTypes?: readonly string[];
};

export function FileTrigger({
  children = "Browse files",
  variant = "outline",
  size = "default",
  disabled = false,
  allowsMultiple,
  acceptDirectory,
  acceptedFileTypes,
  className,
  onSelect,
  onChange,
  ...props
}: FileTriggerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        {...props}
        ref={inputRef}
        type="file"
        multiple={allowsMultiple}
        accept={acceptedFileTypes?.join(",")}
        disabled={disabled}
        {...(acceptDirectory ? ({ webkitdirectory: "" } as React.InputHTMLAttributes<HTMLInputElement>) : {})}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          onChange?.(event);
          onSelect?.(event.currentTarget.files);
        }}
      />
      <Button
        type="button"
        variant={variant}
        size={size}
        disabled={disabled}
        className={className}
        onClick={() => inputRef.current?.click()}
      >
        <Paperclip data-icon="inline-start" aria-hidden="true" />
        {children}
      </Button>
    </>
  );
}
