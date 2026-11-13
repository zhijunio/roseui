"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { MediaGallery, type MediaGalleryItem } from "@/components/ui/media-gallery";

const initialItems: MediaGalleryItem[] = [
  {
    id: "field-study",
    src: "/images/component-demos/abstract-01.svg",
    alt: "Layered coral and blue abstract composition",
    title: "Field study",
    description: "A color study for the spring campaign.",
  },
  {
    id: "signal-map",
    src: "/images/component-demos/abstract-02.svg",
    alt: "Geometric abstract composition with intersecting lines",
    title: "Signal map",
    description: "Navigation system exploration.",
  },
  {
    id: "soft-grid",
    src: "/images/component-demos/abstract-03.svg",
    alt: "Soft geometric abstract composition",
    title: "Soft grid",
    description: "Editorial layout reference.",
  },
  {
    id: "studio-tour",
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    thumbnailSrc: "/images/component-demos/abstract-04.svg",
    alt: "Studio tour video",
    title: "Studio tour",
    description: "A short walk through the production space.",
  },
  {
    id: "night-palette",
    src: "/images/component-demos/abstract-01.svg",
    alt: "Night palette abstract composition",
    title: "Night palette",
    description: "Dark-mode color direction.",
  },
  {
    id: "line-system",
    src: "/images/component-demos/abstract-02.svg",
    alt: "Abstract line system composition",
    title: "Line system",
    description: "Background pattern study.",
  },
  {
    id: "material-notes",
    src: "/images/component-demos/abstract-03.svg",
    alt: "Abstract material study",
    title: "Material notes",
    description: "Texture and surface references.",
  },
  {
    id: "campaign-cut",
    src: "/images/component-demos/abstract-04.svg",
    alt: "Campaign visual abstract composition",
    title: "Campaign cut",
    description: "Shortlisted launch visual.",
  },
  {
    id: "motion-board",
    src: "/images/component-demos/abstract-01.svg",
    alt: "Motion board abstract composition",
    title: "Motion board",
    description: "Storyboard color key.",
  },
];

export function MediaGalleryExamples() {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState<string[]>(["field-study"]);

  return (
    <ComponentPreview title="Media Gallery" layout="fullStack">
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            Open an image or video, select multiple items, remove media, and move between gallery pages.
          </p>
          <p aria-live="polite" className="text-sm font-medium tabular-nums">
            {selectedIds.length} selected
          </p>
        </div>
        <MediaGallery
          items={items}
          pageSize={4}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onRemove={(item) => setItems((currentItems) => currentItems.filter(({ id }) => id !== item.id))}
        />
      </div>
    </ComponentPreview>
  );
}
