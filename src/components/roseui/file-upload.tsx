"use client";

import * as React from "react";

import { AlertCircle, CheckCircle2, Clock3, File as FileIcon, LoaderCircle, Upload, X } from "lucide-react";

import { FileTrigger } from "@/components/roseui/file-trigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FileUploadAccept = Record<string, string[]>;

type FileUploadRejectionReason = "file-type" | "file-size" | "max-files";

type FileUploadRejection = {
  file: File;
  reason: FileUploadRejectionReason;
  message: string;
};

type FileUploadFileStatus = {
  label: string;
  tone?: "neutral" | "progress" | "success" | "error";
};

type FileUploadRenderProps = {
  index: number;
  status?: FileUploadFileStatus;
  remove: () => void;
};

type FileUploadProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: FileUploadAccept;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  onReject?: (rejections: FileUploadRejection[]) => void;
  getFileStatus?: (file: File, index: number) => FileUploadFileStatus | undefined;
  renderFile?: (file: File, props: FileUploadRenderProps) => React.ReactNode;
};

function fileAllowed(file: File, accept?: FileUploadAccept) {
  if (!accept) return true;
  const rules = Object.entries(accept).filter(([mime, extensions]) => mime || extensions.length > 0);
  if (rules.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return rules.some(([mime, extensions]) => {
    if (extensions.some((extension) => name.endsWith(extension.toLowerCase()))) return true;
    const pattern = mime.toLowerCase();
    if (pattern.endsWith("/*")) return type.startsWith(pattern.slice(0, -1));
    return pattern.length > 0 && type === pattern;
  });
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(bytes % (1024 * 1024) === 0 ? 0 : 1)}MB`;
  return `${Math.max(1, Math.round(bytes / 1024))}KB`;
}

function FileStatusIcon({ tone = "neutral" }: { tone?: FileUploadFileStatus["tone"] }) {
  if (tone === "progress") return <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />;
  if (tone === "success") return <CheckCircle2 className="size-3.5" aria-hidden="true" />;
  if (tone === "error") return <AlertCircle className="size-3.5" aria-hidden="true" />;
  return <Clock3 className="size-3.5" aria-hidden="true" />;
}

function FileUpload({
  files,
  onFilesChange,
  accept,
  multiple = false,
  maxSize = 5 * 1024 * 1024,
  maxFiles,
  disabled = false,
  className,
  onReject,
  getFileStatus,
  renderFile,
}: FileUploadProps) {
  const descriptionId = React.useId();
  const errorId = React.useId();
  const [rejections, setRejections] = React.useState<FileUploadRejection[]>([]);
  const [isDropTarget, setIsDropTarget] = React.useState(false);
  const extensions = accept ? Object.values(accept).flat().filter(Boolean) : [];
  const acceptedFileTypes = accept ? [...new Set([...Object.keys(accept).filter(Boolean), ...extensions])] : undefined;
  const occurrences = new Map<string, number>();
  const keyedFiles = files.map((file) => {
    const identity = JSON.stringify([file.name, file.lastModified, file.size, file.type]);
    const occurrence = occurrences.get(identity) ?? 0;
    occurrences.set(identity, occurrence + 1);
    return { file, key: JSON.stringify([identity, occurrence]) };
  });

  const reportRejections = (nextRejections: FileUploadRejection[]) => {
    setRejections(nextRejections);
    if (nextRejections.length > 0) onReject?.(nextRejections);
  };

  const handleFiles = (incoming: readonly File[]) => {
    if (disabled || incoming.length === 0) return;

    const slots = multiple
      ? maxFiles === undefined
        ? Number.POSITIVE_INFINITY
        : Math.max(0, maxFiles - files.length)
      : 1;
    const accepted: File[] = [];
    const nextRejections: FileUploadRejection[] = [];

    for (const file of incoming) {
      if (!fileAllowed(file, accept)) {
        nextRejections.push({
          file,
          reason: "file-type",
          message: `${file.name} is not an accepted file type.`,
        });
        continue;
      }

      if (file.size > maxSize) {
        nextRejections.push({
          file,
          reason: "file-size",
          message: `${file.name} exceeds the ${formatFileSize(maxSize)} limit.`,
        });
        continue;
      }

      if (accepted.length >= slots) {
        nextRejections.push({
          file,
          reason: "max-files",
          message: multiple
            ? `Only ${maxFiles} ${maxFiles === 1 ? "file is" : "files are"} allowed.`
            : "Only one file can be selected.",
        });
        continue;
      }

      accepted.push(file);
    }

    reportRejections(nextRejections);

    if (accepted.length > 0) {
      onFilesChange(multiple ? [...files, ...accepted] : accepted.slice(0, 1));
    }
  };

  const formatSummary = [
    extensions.length > 0 ? extensions.join(", ").toUpperCase() : "Any file type",
    `up to ${formatFileSize(maxSize)}`,
    maxFiles === undefined ? undefined : `maximum ${maxFiles} ${maxFiles === 1 ? "file" : "files"}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div data-slot="file-upload" className={cn("w-full space-y-3", className)}>
      <div
        role="region"
        aria-label="File upload"
        aria-describedby={`${descriptionId}${rejections.length > 0 ? ` ${errorId}` : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setIsDropTarget(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDropTarget(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDropTarget(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDropTarget(false);
          handleFiles(Array.from(event.dataTransfer.files));
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-5 py-6 text-center transition-[border-color,background-color,box-shadow] hover:border-primary/50 hover:bg-muted/30 focus-visible:outline-none",
          isDropTarget && "border-primary bg-muted/40",
          disabled && "cursor-not-allowed opacity-50 hover:border-border hover:bg-background",
        )}
      >
        <span
          data-slot="file-upload-icon"
          className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"
        >
          <Upload className="size-5" aria-hidden="true" />
        </span>
        <span data-slot="file-upload-label" className="text-sm font-medium">
          Drop files here
        </span>
        <span id={descriptionId} data-slot="file-upload-description" className="mt-1 text-xs text-muted-foreground">
          {formatSummary}
        </span>
        <FileTrigger
          acceptedFileTypes={acceptedFileTypes}
          allowsMultiple={multiple}
          disabled={disabled}
          className="mt-3"
          onSelect={(selected) => {
            if (selected) handleFiles(Array.from(selected));
          }}
        >
          Browse files
        </FileTrigger>
      </div>

      {rejections.length > 0 && (
        <div id={errorId} role="alert" className="space-y-1 text-sm text-destructive">
          {rejections.map((rejection) => (
            <p key={`${rejection.reason}-${rejection.file.name}-${rejection.file.lastModified}`}>{rejection.message}</p>
          ))}
        </div>
      )}

      {keyedFiles.length > 0 && (
        <ul aria-label="Selected files" className="space-y-2">
          {keyedFiles.map(({ file, key }, index) => {
            const status = getFileStatus?.(file, index);
            const remove = () => onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));

            if (renderFile) {
              return <li key={key}>{renderFile(file, { index, status, remove })}</li>;
            }

            return (
              <li key={key} className="flex min-w-0 items-center gap-3 rounded-md border border-border px-3 py-2">
                <FileIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {file.name}
                  <span className="ml-2 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                </span>
                {status && (
                  <span
                    data-tone={status.tone ?? "neutral"}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground data-[tone=success]:bg-emerald-500/10 data-[tone=success]:text-emerald-700 data-[tone=error]:bg-destructive/10 data-[tone=error]:text-destructive data-[tone=progress]:bg-primary/10 data-[tone=progress]:text-primary dark:data-[tone=success]:text-emerald-400"
                  >
                    <FileStatusIcon tone={status.tone} />
                    {status.label}
                  </span>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                  onClick={remove}
                >
                  <X className="size-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export type {
  FileUploadAccept,
  FileUploadFileStatus,
  FileUploadProps,
  FileUploadRejection,
  FileUploadRejectionReason,
  FileUploadRenderProps,
};
export { FileUpload, fileAllowed, formatFileSize };
