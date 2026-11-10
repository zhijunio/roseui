"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";



export function SheetExamples() {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <ComponentPreview previewId="sheet-01" title="Sides" layout="grid2">
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Open navigation</Button></SheetTrigger>
                <SheetContent side="left" swipeDirection="left">
                  <SheetHeader><SheetTitle>Workspace</SheetTitle><SheetDescription>Navigate to a workspace area.</SheetDescription></SheetHeader>
                  <nav aria-label="Workspace" className="flex-1 space-y-1 px-4">
                    {["Overview", "Projects", "Reports", "Team"].map((item) => <button key={item} type="button" className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">{item}</button>)}
                  </nav>
                  <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
              <Sheet open={editOpen} onOpenChange={setEditOpen}>
                <SheetTrigger asChild><Button variant="outline">Edit workspace</Button></SheetTrigger>
                <SheetContent side="right" swipeDirection="right">
                  <SheetHeader><SheetTitle>Edit workspace</SheetTitle><SheetDescription>Update the workspace name and status.</SheetDescription></SheetHeader>
                  <form className="flex flex-1 flex-col gap-4 px-5" onSubmit={(event) => { event.preventDefault(); toast.success("Workspace changes saved"); setEditOpen(false); }}>
                    <div className="grid gap-2"><Label htmlFor="sheet-workspace-name">Workspace name</Label><Input id="sheet-workspace-name" defaultValue="Product Design" required /></div>
                    <div className="grid gap-1 text-sm"><span className="text-muted-foreground">Status</span><span className="font-medium">Active</span></div>
                    <SheetFooter className="px-0"><SheetClose asChild><Button variant="outline" type="button">Cancel</Button></SheetClose><Button type="submit">Save changes</Button></SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Open quick actions</Button></SheetTrigger>
                <SheetContent side="bottom" swipeDirection="down">
                  <SheetHeader><SheetTitle>Quick actions</SheetTitle><SheetDescription>Choose an action for this project.</SheetDescription></SheetHeader>
                  <div className="grid gap-2 px-5 sm:grid-cols-3">
                    <Button variant="outline">Create task</Button><Button variant="outline">Invite teammate</Button><Button variant="outline">Share project</Button>
                  </div>
                  <SheetFooter><SheetClose asChild><Button variant="outline">Done</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Open announcement</Button></SheetTrigger>
                <SheetContent side="top" swipeDirection="up">
                  <SheetHeader><SheetTitle>Scheduled maintenance</SheetTitle><SheetDescription>Workspace reports will be unavailable on Saturday from 10:00 to 10:30 UTC.</SheetDescription></SheetHeader>
                  <SheetFooter className="sm:flex-row sm:justify-end"><SheetClose asChild><Button>Got it</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
              <div className="flex flex-wrap gap-2">{(["top", "right", "bottom", "left"] as const).map((side) => <Sheet key={side}><SheetTrigger asChild><Button variant="outline" size="sm">{side[0].toUpperCase() + side.slice(1)}</Button></SheetTrigger><SheetContent side={side} swipeDirection={side === "top" ? "up" : side === "bottom" ? "down" : side}><SheetHeader><SheetTitle>{side[0].toUpperCase() + side.slice(1)} sheet</SheetTitle><SheetDescription>Open and close a workspace panel from the {side} edge.</SheetDescription></SheetHeader><SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter></SheetContent></Sheet>)}</div>
            </ComponentPreview>
            <ComponentPreview previewId="sheet-02" title="Detached">
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Open detached panel</Button></SheetTrigger>
                <SheetContent side="right" detached>
                  <SheetHeader><SheetTitle>Quick details</SheetTitle><SheetDescription>This panel sits inset from the viewport edge.</SheetDescription></SheetHeader>
                  <div className="flex-1 px-4 text-sm text-muted-foreground">The close button and Escape key remain available alongside the swipe gesture.</div>
                  <SheetFooter><SheetClose asChild><Button variant="outline">Close panel</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
            </ComponentPreview>
            <ComponentPreview previewId="sheet-03" title="Non-dismissible">
              <Sheet>
                <SheetTrigger asChild><Button variant="outline">Review required settings</Button></SheetTrigger>
                <SheetContent dismissible={false} disableEscapeClose showCloseButton={false}>
                  <SheetHeader><SheetTitle>Review required settings</SheetTitle><SheetDescription>Close this panel with the action below.</SheetDescription></SheetHeader>
                  <div className="px-4 text-sm text-muted-foreground">Clicking outside or pressing Escape will keep this panel open.</div>
                  <SheetFooter><SheetClose asChild><Button>Done</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
            </ComponentPreview>
            <ComponentPreview previewId="sheet-04" title="Backdrop Variants" layout="grid3">
              {([
                { label: "Opaque", className: "bg-black/35" },
                { label: "Blur", className: "bg-black/20 backdrop-blur-sm" },
                { label: "Transparent", className: "bg-transparent" },
              ] as const).map(({ label, className }) => (
                <Sheet key={label}>
                  <SheetTrigger asChild><Button variant="outline">{label}</Button></SheetTrigger>
                  <SheetContent overlayClassName={className}>
                    <SheetHeader><SheetTitle>{label} backdrop</SheetTitle><SheetDescription>Backdrop styling can be customized for this panel.</SheetDescription></SheetHeader>
                    <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter>
                  </SheetContent>
                </Sheet>
              ))}
            </ComponentPreview>
            <ComponentPreview previewId="sheet-05" title="Controlled">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={() => setControlledOpen((open) => !open)}>
                  {controlledOpen ? "Close" : "Toggle"} panel
                </Button>
                <span role="status" className="text-sm text-muted-foreground">
                  {controlledOpen ? "Open" : "Closed"}
                </span>
                <Sheet open={controlledOpen} onOpenChange={setControlledOpen}>
                  <SheetTrigger asChild><Button>Open details</Button></SheetTrigger>
                  <SheetContent>
                    <SheetHeader><SheetTitle>Workspace details</SheetTitle><SheetDescription>Open state is controlled by the example.</SheetDescription></SheetHeader>
                    <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </ComponentPreview>
            <ComponentPreview previewId="sheet-06" title="Scroll">
              <Sheet><SheetTrigger asChild><Button variant="outline">Review activity</Button></SheetTrigger><SheetContent side="bottom" swipeDirection="down" className="max-h-[80vh]"><SheetHeader><SheetTitle>Recent workspace activity</SheetTitle><SheetDescription>Review updates before sharing the monthly report.</SheetDescription></SheetHeader><div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5">{["Project created · Platform refresh", "Maya updated the deployment guide", "Three new API keys were issued", "Quarterly report exported", "Alex invited two collaborators", "Workspace retention changed", "Incident review completed", "Billing contact updated", "New integration connected", "Audit log downloaded"].map((activity, index) => <div key={activity} className="flex items-start gap-3 rounded-lg border p-3"><span className="mt-1 size-2 shrink-0 rounded-full bg-primary" /><div className="min-w-0"><p className="text-sm">{activity}</p><p className="mt-1 text-xs text-muted-foreground">{index + 2} minutes ago</p></div></div>)}</div><SheetFooter><SheetClose asChild><Button variant="outline">Close activity</Button></SheetClose><Button onClick={() => toast.success("Activity report exported")}>Export report</Button></SheetFooter></SheetContent></Sheet>
            </ComponentPreview>
    </>
  );
}
