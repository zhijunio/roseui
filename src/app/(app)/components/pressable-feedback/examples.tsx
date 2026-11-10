"use client"

import * as React from "react"
import { IconArchive, IconTrash } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { HoldToConfirm } from "@/components/composite/hold-to-confirm"

function ArchiveExample() {
  const [status, setStatus] = React.useState("")
  return <div className="grid justify-items-center gap-3"><HoldToConfirm label="Archive workspace" confirmedLabel="Workspace archived" duration={1100} resetOnComplete onConfirm={() => setStatus("The workspace is archived.")} /><p className="min-h-5 text-sm text-muted-foreground" role="status" aria-live="polite">{status}</p></div>
}

function DeleteExample() {
  const [status, setStatus] = React.useState("")
  return <div className="grid justify-items-center gap-3"><HoldToConfirm label={<><IconTrash />Delete draft</>} confirmedLabel="Draft deleted" onConfirm={() => setStatus("The draft has been deleted.")} /><p className="min-h-5 text-sm text-muted-foreground" role="status" aria-live="polite">{status}</p></div>
}

export function HoldToConfirmExamples() {
  return <>
    <ComponentPreview previewId="pressable-feedback-01" title="Destructive confirmation" exampleLabels={["Hold to archive"]}><ArchiveExample /></ComponentPreview>
    <ComponentPreview previewId="pressable-feedback-02" title="Hold duration" exampleLabels={["Hold to delete"]}><DeleteExample /></ComponentPreview>
    <ComponentPreview previewId="pressable-feedback-03" title="Disabled" exampleLabels={["Unavailable action"]}><HoldToConfirm label={<><IconArchive />Archive workspace</>} onConfirm={() => undefined} disabled /></ComponentPreview>
  </>
}
