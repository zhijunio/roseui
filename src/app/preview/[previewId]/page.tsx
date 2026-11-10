import { notFound } from "next/navigation";
import { previewAliases, previewLoaders, type PreviewId } from "../preview-loaders";
import { TooltipProvider } from "@/components/ui/tooltip";

function isPreviewId(previewId: string): previewId is PreviewId {
  return previewId in previewLoaders;
}

function isPreviewAlias(previewId: string): previewId is keyof typeof previewAliases {
  return previewId in previewAliases;
}

export default async function PreviewPage({ params }: { params: Promise<{ previewId: string }> }) {
  const { previewId } = await params;
  const canonicalPreviewId = isPreviewId(previewId)
    ? previewId
    : isPreviewAlias(previewId)
      ? previewAliases[previewId]
      : null;
  if (!canonicalPreviewId) notFound();

  const Preview = previewLoaders[canonicalPreviewId];
  const previewSelector = `[data-preview-content-id="${canonicalPreviewId}"]`;

  return (
    <main className="preview-only-root min-h-dvh bg-background p-2 sm:p-3">
      <style>{`
        .preview-only-root :where(*) {
          visibility: hidden;
        }

        .preview-only-root ${previewSelector},
        .preview-only-root ${previewSelector} * {
          visibility: visible;
        }

        .preview-only-root ${previewSelector} {
          position: fixed;
          inset: 0;
          z-index: 1;
          display: flex;
          min-width: 0;
          min-height: 100dvh;
          align-items: flex-start;
          justify-content: center;
          overflow: auto;
          padding: 0.5rem;
          background: var(--background);
        }
      `}</style>
      <TooltipProvider delayDuration={0}>
        <div className="mx-auto w-full max-w-7xl">
          <Preview />
        </div>
      </TooltipProvider>
    </main>
  );
}
