import type { Metadata } from "next";

import { MediaGalleryExamples } from "@/components/examples/media-gallery/media-gallery";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "Browse, select, remove, paginate, and preview images and videos.",
};

export default function MediaGalleryPage() {
  return <MediaGalleryExamples />;
}
