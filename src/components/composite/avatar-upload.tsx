"use client";

import * as React from "react";

import { IconCamera, IconX } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function AvatarUpload({
  name,
  src,
  onUpload,
  onRemove,
  accept = "image/png,image/jpeg,image/webp",
  maxSize = 5 * 1024 * 1024,
  disabled = false,
  className,
}: {
  name: string;
  src?: string;
  onUpload: (file: File, report: (progress: number) => void) => Promise<string | void>;
  onRemove?: () => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}) {
  const input = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState(src);
  const [message, setMessage] = React.useState("");
  const [progress, setProgress] = React.useState<number | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [cropping, setCropping] = React.useState(false);
  const [cropScale, setCropScale] = React.useState(1);
  const [cropX, setCropX] = React.useState(0);
  const [cropY, setCropY] = React.useState(0);
  const [file, setFile] = React.useState<File>();
  React.useEffect(
    () => () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  const choose = async (candidate?: File) => {
    if (!candidate || disabled) return;
    if (!candidate.type.startsWith("image/")) {
      setMessage("Choose an image file to continue.");
      return;
    }
    if (candidate.size > maxSize) {
      setMessage(`Image must be smaller than ${Math.round(maxSize / 1024 / 1024)} MB.`);
      return;
    }
    setFile(candidate);
    setPreview(URL.createObjectURL(candidate));
    setCropScale(1);
    setCropX(0);
    setCropY(0);
    setMessage("");
    setProgress(null);
  };
  const crop = async () => {
    if (!file || cropping || busy) return;
    setCropping(true);
    setMessage("");
    const sourceUrl = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = sourceUrl;
      await image.decode();
      const size = Math.min(image.naturalWidth, image.naturalHeight);
      const cropSize = size / cropScale;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not prepare the image crop.");
      const maxX = image.naturalWidth - cropSize;
      const maxY = image.naturalHeight - cropSize;
      const sourceX = maxX / 2 + ((maxX / 2) * cropX) / 100;
      const sourceY = maxY / 2 + ((maxY / 2) * cropY) / 100;
      context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file.type || "image/jpeg", 0.92));
      if (!blob) throw new Error("Could not create the cropped image.");
      const cropped = new File([blob], file.name, {
        type: blob.type,
        lastModified: Date.now(),
      });
      setFile(cropped);
      setPreview(URL.createObjectURL(cropped));
      setCropScale(1);
      setCropX(0);
      setCropY(0);
      setMessage("Image crop ready to save.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not crop the image.");
    } finally {
      URL.revokeObjectURL(sourceUrl);
      setCropping(false);
    }
  };
  const upload = async () => {
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await onUpload(file, (value) =>
        setProgress(Math.max(0, Math.min(100, value <= 1 ? value * 100 : value))),
      );
      if (result) setPreview(result);
      setFile(undefined);
      setProgress(null);
      setMessage("Profile image updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed. Try again.");
    } finally {
      setBusy(false);
    }
  };
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const displayedPreview = file ? preview : (src ?? preview);
  return (
    <div className={cn("flex min-w-0 flex-wrap items-center gap-4", className)}>
      <input
        ref={input}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          void choose(event.currentTarget.files?.[0]);
          event.currentTarget.value = "";
        }}
      />
      <button
        type="button"
        disabled={disabled || busy}
        aria-label={displayedPreview ? "Choose a replacement profile image" : "Choose a profile image"}
        onClick={() => input.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void choose(event.dataTransfer.files[0]);
        }}
        className="group relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Avatar size="xl">
          <AvatarImage
            src={displayedPreview}
            alt=""
            style={{
              objectPosition: `${50 + cropX / 2}% ${50 + cropY / 2}%`,
              transform: `scale(${cropScale})`,
            }}
          />
          <AvatarFallback>{initials || "?"}</AvatarFallback>
        </Avatar>
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center rounded-full bg-foreground/50 text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <IconCamera />
        </span>
      </button>
      <div className="min-w-48 flex-1 space-y-2">
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            PNG, JPEG or WebP · up to {Math.round(maxSize / 1024 / 1024)} MB
          </p>
        </div>
        {file && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => void crop()} disabled={busy || cropping}>
                {cropping ? "Cropping..." : "Crop image"}
              </Button>
              <Button size="sm" onClick={() => void upload()} disabled={busy || cropping}>
                {busy ? "Uploading..." : "Save image"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={busy || cropping}
                onClick={() => {
                  setFile(undefined);
                  setPreview(src);
                  setCropScale(1);
                  setCropX(0);
                  setCropY(0);
                  setProgress(null);
                  setMessage("Image change canceled.");
                }}
              >
                Cancel
              </Button>
            </div>
            <label htmlFor="avatar-crop-zoom" className="block text-xs text-muted-foreground">
              Crop zoom
            </label>
            <input
              id="avatar-crop-zoom"
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={cropScale}
              disabled={busy || cropping}
              onChange={(event) => setCropScale(Number(event.currentTarget.value))}
              className="w-full accent-primary"
              aria-valuetext={`${cropScale.toFixed(1)}x`}
            />
            <div className="grid grid-cols-2 gap-2">
              <label htmlFor="avatar-crop-x" className="text-xs text-muted-foreground">
                Horizontal position
                <input
                  id="avatar-crop-x"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={cropX}
                  disabled={busy || cropping}
                  onChange={(event) => setCropX(Number(event.currentTarget.value))}
                  className="mt-1 w-full accent-primary"
                  aria-valuetext={`${cropX}%`}
                />
              </label>
              <label htmlFor="avatar-crop-y" className="text-xs text-muted-foreground">
                Vertical position
                <input
                  id="avatar-crop-y"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={cropY}
                  disabled={busy || cropping}
                  onChange={(event) => setCropY(Number(event.currentTarget.value))}
                  className="mt-1 w-full accent-primary"
                  aria-valuetext={`${cropY}%`}
                />
              </label>
            </div>
          </div>
        )}
        {busy && <Progress value={progress ?? undefined} aria-label="Image upload progress" />}
        {onRemove && displayedPreview && (
          <Button
            variant="ghost"
            size="sm"
            disabled={disabled || busy}
            onClick={() => {
              onRemove();
              setPreview(undefined);
              setFile(undefined);
              setMessage("Profile image removed.");
            }}
          >
            <IconX /> Remove image
          </Button>
        )}
        <p aria-live="polite" className={cn("text-xs", message && "text-muted-foreground")}>
          {message}
        </p>
      </div>
    </div>
  );
}
