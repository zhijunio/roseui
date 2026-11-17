"use client";

import * as React from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight, Expand, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/roseui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type MediaGalleryItemBase = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  thumbnailSrc?: string;
};

type MediaGalleryImage = MediaGalleryItemBase & {
  type?: "image";
};

type MediaGalleryVideo = MediaGalleryItemBase & {
  type: "video";
};

type MediaGalleryItem = MediaGalleryImage | MediaGalleryVideo;

type MediaGalleryProps = Omit<React.ComponentProps<"div">, "children"> & {
  items: readonly MediaGalleryItem[];
  pageSize?: number;
  selectedIds?: readonly string[];
  defaultSelectedIds?: readonly string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  selectionMode?: "none" | "multiple";
  onRemove?: (item: MediaGalleryItem) => void;
  emptyState?: React.ReactNode;
};

function MediaThumbnail({ item, priority = false }: { item: MediaGalleryItem; priority?: boolean }) {
  if (item.type === "video") {
    if (item.thumbnailSrc) {
      return (
        <>
          <Image
            src={item.thumbnailSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            unoptimized
            className="object-cover transition-transform duration-300 group-hover/gallery-item:scale-[1.03]"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <span className="grid size-11 place-items-center rounded-full bg-white/90 text-black shadow-sm">
              <span className="ml-0.5 size-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
            </span>
          </span>
        </>
      );
    }

    return (
      <video
        src={item.src}
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="size-full object-cover transition-transform duration-300 group-hover/gallery-item:scale-[1.03]"
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      unoptimized
      className="object-cover transition-transform duration-300 group-hover/gallery-item:scale-[1.03]"
    />
  );
}

function MediaPreview({ item }: { item: MediaGalleryItem }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        controls
        autoPlay
        playsInline
        className="max-h-[calc(100dvh-13rem)] w-full rounded-md bg-black object-contain"
      >
        Your browser does not support embedded video.
      </video>
    );
  }

  return (
    <div className="relative aspect-video max-h-[calc(100dvh-13rem)] w-full overflow-hidden rounded-md bg-muted">
      <Image src={item.src} alt={item.alt} fill sizes="800px" unoptimized className="object-contain" />
    </div>
  );
}

function MediaGallery({
  items,
  pageSize = 8,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  selectionMode = "multiple",
  onRemove,
  emptyState = "No media items.",
  className,
  ...props
}: MediaGalleryProps) {
  const safePageSize = Math.max(1, pageSize);
  const [page, setPage] = React.useState(0);
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(() => [...defaultSelectedIds]);
  const [previewId, setPreviewId] = React.useState<string | null>(null);
  const activeSelectedIds = selectedIds ?? internalSelectedIds;
  const pageCount = Math.max(1, Math.ceil(items.length / safePageSize));
  const activePage = Math.min(page, pageCount - 1);
  const visibleItems = items.slice(activePage * safePageSize, (activePage + 1) * safePageSize);
  const previewItem = items.find((item) => item.id === previewId);

  const updateSelection = React.useCallback(
    (nextSelectedIds: string[]) => {
      if (selectedIds === undefined) setInternalSelectedIds(nextSelectedIds);
      onSelectionChange?.(nextSelectedIds);
    },
    [onSelectionChange, selectedIds],
  );

  const removeItem = (item: MediaGalleryItem) => {
    if (activeSelectedIds.includes(item.id)) {
      updateSelection(activeSelectedIds.filter((id) => id !== item.id));
    }
    if (previewId === item.id) setPreviewId(null);
    onRemove?.(item);
  };

  return (
    <div data-slot="media-gallery" className={cn("w-full space-y-4", className)} {...props}>
      {visibleItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((item, index) => {
            const isSelected = activeSelectedIds.includes(item.id);
            const title = item.title ?? item.alt;

            return (
              <article
                key={item.id}
                data-slot="media-gallery-item"
                data-selected={isSelected || undefined}
                className="group/gallery-item overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-xs data-[selected=true]:border-primary data-[selected=true]:ring-2 data-[selected=true]:ring-primary/20"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <button
                    type="button"
                    aria-label={`Preview ${title}`}
                    className="group/preview absolute inset-0 z-0 block size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring"
                    onClick={() => setPreviewId(item.id)}
                  >
                    <MediaThumbnail item={item} priority={activePage === 0 && index === 0} />
                    <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-[background-color,opacity] group-hover/preview:bg-black/20 group-hover/preview:opacity-100 group-focus-visible/preview:bg-black/20 group-focus-visible/preview:opacity-100">
                      <span className="grid size-9 place-items-center rounded-full bg-black/60">
                        <Expand className="size-4" />
                      </span>
                    </span>
                  </button>

                  {selectionMode === "multiple" && (
                    <div className="absolute left-2 top-2 z-10 rounded bg-white/90 p-1 text-black shadow-sm dark:bg-black/80 dark:text-white">
                      <Checkbox
                        checked={isSelected}
                        aria-label={`${isSelected ? "Deselect" : "Select"} ${title}`}
                        onCheckedChange={(checked) => {
                          const nextSelectedIds = checked
                            ? [...activeSelectedIds, item.id]
                            : activeSelectedIds.filter((id) => id !== item.id);
                          updateSelection([...new Set(nextSelectedIds)]);
                        }}
                      />
                    </div>
                  )}

                  {onRemove && (
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      aria-label={`Remove ${title}`}
                      className="absolute right-2 top-2 z-10 border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-background"
                      onClick={() => removeItem(item)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-1 p-3">
                  <h3 className="truncate text-sm font-medium">{title}</h3>
                  {item.description && <p className="line-clamp-2 text-xs text-muted-foreground">{item.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-border bg-muted/20 px-6 text-center text-sm text-muted-foreground">
          {emptyState}
        </div>
      )}

      {pageCount > 1 && (
        <nav aria-label="Media gallery pagination" className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous media page"
            disabled={activePage === 0}
            onClick={() => setPage((currentPage) => Math.max(0, currentPage - 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="min-w-24 text-center text-sm text-muted-foreground tabular-nums" aria-live="polite">
            Page {activePage + 1} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next media page"
            disabled={activePage >= pageCount - 1}
            onClick={() => setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}

      <Dialog open={previewItem !== undefined} onOpenChange={(open) => !open && setPreviewId(null)}>
        {previewItem && (
          <DialogContent size="xl" className="max-h-[calc(100dvh-2rem)] overflow-hidden">
            <DialogHeader className="pr-10">
              <DialogTitle>{previewItem.title ?? previewItem.alt}</DialogTitle>
              {previewItem.description && <DialogDescription>{previewItem.description}</DialogDescription>}
            </DialogHeader>
            <DialogBody>
              <MediaPreview item={previewItem} />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export type { MediaGalleryImage, MediaGalleryItem, MediaGalleryProps, MediaGalleryVideo };
export { MediaGallery };
