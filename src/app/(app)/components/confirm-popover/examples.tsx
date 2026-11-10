"use client";

import { useState } from "react";
import { IconAlertTriangle, IconTrash, IconX } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function ConfirmAction() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [busy, setBusy] = useState(false);
  const confirm = () => { setBusy(true); window.setTimeout(() => { setBusy(false); setOpen(false); setDeleted(true); }, 500); };
  return <div className="flex flex-wrap items-center gap-3"><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button variant="outline" disabled={deleted}><IconTrash />{deleted ? "Removed" : "Remove item"}</Button></PopoverTrigger><PopoverContent role="alertdialog" aria-label="Confirm removal" className="w-[min(20rem,calc(100vw-2rem))] p-4"><div className="space-y-3"><div className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive"><IconAlertTriangle className="size-4" /></span><div><p className="font-medium">Remove this item?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">This action cannot be undone.</p></div></div><div className="flex justify-end gap-2"><Button size="sm" variant="ghost" onClick={() => setOpen(false)}><IconX />Cancel</Button><Button size="sm" variant="destructive" onClick={confirm} disabled={busy}>{busy ? "Removing…" : "Remove"}</Button></div></div></PopoverContent></Popover>{deleted && <span role="status" className="text-sm text-muted-foreground">Item removed.</span>}</div>;
}

function InlineConfirmation() {
  const [confirmed, setConfirmed] = useState(false);
  return <div className="flex flex-wrap items-center gap-3"><Button variant="ghost" size="sm" onClick={() => setConfirmed(true)} disabled={confirmed}>{confirmed ? "Action confirmed" : "Confirm action"}</Button>{confirmed && <span role="status" className="text-sm text-muted-foreground">The change is ready.</span>}</div>;
}

export function ConfirmPopoverExamples() { return <><ComponentPreview previewId="confirm-popover-01" title="Destructive confirmation" layout="field"><ConfirmAction /></ComponentPreview><ComponentPreview previewId="confirm-popover-02" title="Inline confirmation" layout="field"><InlineConfirmation /></ComponentPreview></>; }
