"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { FileTrigger, type FileTriggerProps } from "@/components/ui/file-trigger";

type FileExampleProps = {
  triggerLabel: string;
  emptyLabel?: string;
  allowsMultiple?: boolean;
  acceptDirectory?: boolean;
  acceptedFileTypes?: readonly string[];
  isDisabled?: boolean;
  variant?: FileTriggerProps["variant"];
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileExample({
  triggerLabel,
  emptyLabel = "No files selected",
  allowsMultiple,
  acceptDirectory,
  acceptedFileTypes,
  isDisabled,
  variant,
}: FileExampleProps) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <FileTrigger
        allowsMultiple={allowsMultiple}
        acceptDirectory={acceptDirectory}
        acceptedFileTypes={acceptedFileTypes}
        isDisabled={isDisabled}
        variant={variant}
        onSelect={(selectedFiles) => setFiles(selectedFiles ? Array.from(selectedFiles) : [])}
      >
        {triggerLabel}
      </FileTrigger>
      <div aria-live="polite" className="bg-muted/30 rounded-lg border p-3 text-sm">
        {files.length === 0 ? (
          <p className="text-muted-foreground">{isDisabled ? "File selection is unavailable." : emptyLabel}</p>
        ) : (
          <ul className="grid gap-2">
            {files.map((file) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-start justify-between gap-3"
              >
                <span className="min-w-0 truncate">{file.name}</span>
                <span className="text-muted-foreground shrink-0 text-xs">{formatFileSize(file.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function FileTriggerExamples() {
  return (
    <>
      <ComponentPreview title="Button variants">
        <div className="flex flex-wrap gap-2">
          {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
            <FileTrigger key={variant} variant={variant}>
              {variant}
            </FileTrigger>
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Default">
        <FileExample triggerLabel="Select a file" />
      </ComponentPreview>
      <ComponentPreview title="Multiple Selection">
        <FileExample
          triggerLabel="Upload images"
          allowsMultiple
          acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
        />
      </ComponentPreview>
      <ComponentPreview title="Folder">
        <FileExample triggerLabel="Choose a folder" acceptDirectory />
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <FileExample triggerLabel="Upload unavailable" isDisabled />
      </ComponentPreview>
    </>
  );
}
