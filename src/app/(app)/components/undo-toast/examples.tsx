"use client";
import { useState } from "react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { UndoToast, type UndoableEntry } from "@/components/composite/undo-toast";
const initial: UndoableEntry[] = [
  { id: "r-101", title: "Quarterly access review", description: "Due Nov 18 · Security" },
  { id: "r-102", title: "Prepare support handoff", description: "Due Nov 20 · Customer operations" },
  { id: "r-103", title: "Refresh billing contacts", description: "Due Nov 22 · Finance" },
];
export function UndoToastExamples() {
  const [items, setItems] = useState(initial);
  const [shouldFail, setShouldFail] = useState(false);
  return <ComponentPreview previewId="undo-toast-01" title="Reversible list actions" layout="panel"><div className="space-y-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={shouldFail} onChange={(event) => setShouldFail(event.currentTarget.checked)} /> Simulate save failure</label><UndoToast items={items} onItemsChange={setItems} duration={3000} onCommit={async () => { await new Promise((resolve) => window.setTimeout(resolve, 300)); if (shouldFail) throw new Error("Save failed"); }} label="Workspace tasks" /></div></ComponentPreview>;
}
