"use client";

import { type ReactNode, useState } from "react";

import {
  IconAlertTriangle,
  IconBellRinging,
  IconBluetooth,
  IconCircleCheck,
  IconDeviceDesktop,
  IconLogout,
  IconShieldCheck,
  IconTrash,
  IconUserOff,
  IconX,
} from "@tabler/icons-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@/components/ui/frame";
import { Input } from "@/components/ui/input";
import { ComponentPreview } from "@/examples/component-preview";

function Example({ trigger, children }: { trigger: string; children: ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </AlertDialogTrigger>
      {children}
    </AlertDialog>
  );
}

function PortalExample() {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setPortalContainer} className="relative isolate flex min-h-24 items-center rounded-lg border p-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open in this preview</Button>
        </AlertDialogTrigger>
        <AlertDialogContent portalContainer={portalContainer}>
          <AlertDialogHeader>
            <AlertDialogTitle>Dialog in a custom container</AlertDialogTitle>
            <AlertDialogDescription>
              This alert dialog is rendered inside the bordered preview area.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function AlertDialogLayoutExamples() {
  return (
    <>
      <ComponentPreview title="Placement and Size" layout="grid4" span={2}>
        <Example trigger="Center · Extra small">
          <AlertDialogContent placement="center" size="xs">
            <AlertDialogHeader>
              <AlertDialogTitle>Extra small dialog</AlertDialogTitle>
              <AlertDialogDescription>A compact confirmation for a short message.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
        <Example trigger="Top · Small">
          <AlertDialogContent placement="top" size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Top placement</AlertDialogTitle>
              <AlertDialogDescription>This compact confirmation is positioned near the top.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
        <Example trigger="Center · Medium">
          <AlertDialogContent placement="center" size="default">
            <AlertDialogHeader>
              <AlertDialogTitle>Centered placement</AlertDialogTitle>
              <AlertDialogDescription>
                The standard alert dialog remains centered in the viewport.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
        <Example trigger="Bottom · Large">
          <AlertDialogContent placement="bottom" size="lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Bottom placement</AlertDialogTitle>
              <AlertDialogDescription>
                A wider alert dialog can sit near the bottom of the viewport.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
      </ComponentPreview>

      <ComponentPreview title="Backdrop" layout="grid4" span={2}>
        {(
          [
            ["Opaque", "opaque"],
            ["Blur", "blur"],
            ["Transparent", "transparent"],
          ] as const
        ).map(([label, backdrop]) => (
          <Example key={backdrop} trigger={label}>
            <AlertDialogContent backdrop={backdrop}>
              <AlertDialogHeader>
                <AlertDialogTitle>{label} backdrop</AlertDialogTitle>
                <AlertDialogDescription>The overlay treatment can be selected for the context.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        ))}
        <Example trigger="Destructive tint">
          <AlertDialogContent backdropClassName="bg-destructive/10 supports-backdrop-filter:backdrop-blur-xs">
            <AlertDialogHeader>
              <AlertDialogTitle>Custom destructive backdrop</AlertDialogTitle>
              <AlertDialogDescription>
                The overlay can use a semantic tint for a destructive confirmation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
      </ComponentPreview>

      <ComponentPreview title="Confirmation" layout="grid3" span={2}>
        <div className="min-w-0">
          <Example trigger="Publish changes">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publish these changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  The updated dashboard will be visible to all workspace members.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Publish</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Grant access">
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Grant viewer access?</AlertDialogTitle>
                <AlertDialogDescription>
                  This member will be able to view reports in this workspace.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Not now</AlertDialogCancel>
                <AlertDialogAction>Grant access</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Pair device">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <IconBluetooth />
                </AlertDialogMedia>
                <AlertDialogTitle>Pair this device?</AlertDialogTitle>
                <AlertDialogDescription>Connect the reporting display to the workspace.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Pair device</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Connect display">
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <IconDeviceDesktop />
                </AlertDialogMedia>
                <AlertDialogTitle>Connect this display?</AlertDialogTitle>
                <AlertDialogDescription>It will receive the live operations dashboard.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Connect</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Sign out">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out of this account?</AlertDialogTitle>
                <AlertDialogDescription>You can sign in again at any time.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:grid sm:grid-cols-2 sm:p-0 sm:[&>*]:m-0 sm:[&>*]:rounded-none sm:[&>*:first-child]:border-r">
                <AlertDialogCancel>
                  <IconLogout />
                  No, stay
                </AlertDialogCancel>
                <AlertDialogAction>Yes, sign out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
      </ComponentPreview>
    </>
  );
}

function AlertDialogDestructiveExamples() {
  const [confirmation, setConfirmation] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <ComponentPreview title="Destructive" layout="grid4" span={2}>
        <div className="min-w-0">
          <Example trigger="Delete report">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia status="danger">
                  <IconTrash />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete this report?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the report and its saved views. <a href="#">Learn about data retention</a>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Deactivate account">
            <AlertDialogContent>
              <AlertDialogHeader className="sm:grid-cols-[auto_1fr] sm:items-start sm:text-left">
                <AlertDialogMedia status="danger">
                  <IconUserOff />
                </AlertDialogMedia>
                <AlertDialogTitle>Deactivate this account?</AlertDialogTitle>
                <AlertDialogDescription className="sm:col-start-2">
                  Jordan Lee will lose access immediately. Their activity history will remain available to workspace
                  admins.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Deactivate</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Transfer ownership</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Transfer workspace ownership?</AlertDialogTitle>
                <AlertDialogDescription>
                  Type Northwind below to confirm. The new owner will control billing and member access.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                aria-label="Workspace name"
                autoComplete="off"
                placeholder="Northwind"
                value={confirmation}
                onChange={(event) => setConfirmation(event.currentTarget.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmation("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={confirmation.trim().toLowerCase() !== "northwind"}
                  onClick={() => setConfirmation("")}
                >
                  Transfer ownership
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="min-w-0">
          <AlertDialog
            open={deleteOpen}
            onOpenChange={(open) => {
              if (!deleting) setDeleteOpen(open);
            }}
          >
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  The project and its saved reports will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  disabled={deleting}
                  onClick={(event) => {
                    event.preventDefault();
                    setDeleting(true);
                    window.setTimeout(() => {
                      setDeleting(false);
                      setDeleteOpen(false);
                    }, 600);
                  }}
                >
                  {deleting ? "Deleting…" : "Delete project"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </ComponentPreview>
    </>
  );
}

function AlertDialogBehaviorExamples() {
  const [nestedOpen, setNestedOpen] = useState(false);
  const [skipUnsavedPrompt, setSkipUnsavedPrompt] = useState(false);
  const [closeMethodsOpen, setCloseMethodsOpen] = useState(false);

  return (
    <>
      <ComponentPreview title="Dismiss Behavior" layout="grid2" span={2}>
        <Example trigger="Require an explicit choice">
          <AlertDialogContent disableEscapeClose>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this integration?</AlertDialogTitle>
              <AlertDialogDescription>
                Pressing Escape will keep this confirmation open. Choose an action below to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep integration</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
        <Example trigger="Allow Escape to close">
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Review these settings?</AlertDialogTitle>
              <AlertDialogDescription>
                Press Escape or choose an action to close this confirmation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Save settings</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Example>
      </ComponentPreview>

      <ComponentPreview title="Custom Trigger and Close" layout="grid2" span={2}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">
              <IconShieldCheck /> Review security
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogCancel
              variant="ghost"
              size="icon"
              aria-label="Close alert dialog"
              className="absolute top-3 right-3 text-muted-foreground"
            >
              <IconX aria-hidden="true" />
            </AlertDialogCancel>
            <AlertDialogHeader>
              <AlertDialogTitle>Review security settings?</AlertDialogTitle>
              <AlertDialogDescription>Check the workspace protections before continuing.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction>Review settings</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={closeMethodsOpen} onOpenChange={setCloseMethodsOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Open controlled dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Choose how to close</AlertDialogTitle>
              <AlertDialogDescription>Use Cancel, Confirm, or the explicit close action.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:flex-wrap">
              <Button variant="ghost" onClick={() => setCloseMethodsOpen(false)}>
                Close dialog
              </Button>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentPreview>

      <ComponentPreview title="In Context" layout="stack" span={2}>
        <div className="w-full min-w-0 max-w-lg">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open workspace settings</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Workspace settings</DialogTitle>
                <DialogDescription>Manage workspace access and ownership.</DialogDescription>
              </DialogHeader>
              <AlertDialog open={nestedOpen} onOpenChange={setNestedOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Remove workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this workspace?</AlertDialogTitle>
                    <AlertDialogDescription>Members will lose access to its projects.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep workspace</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => setNestedOpen(false)}>
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogContent>
          </Dialog>
        </div>
        <Frame className="w-full min-w-0 max-w-lg">
          <FramePanel>
            <FrameHeader>
              <FrameTitle>Report editor</FrameTitle>
              <FrameDescription>Draft changes have not been saved.</FrameDescription>
            </FrameHeader>
            <FrameFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Navigate away</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
                    <AlertDialogDescription>Your edits to the quarterly report will be lost.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={skipUnsavedPrompt}
                      onCheckedChange={(value) => setSkipUnsavedPrompt(value === true)}
                    />
                    Don’t ask again
                  </label>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Stay here</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Discard changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FrameFooter>
          </FramePanel>
        </Frame>
      </ComponentPreview>
    </>
  );
}

function AlertDialogFeedbackExamples() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <ComponentPreview title="Notice" layout="grid3" span={2}>
        <div className="min-w-0">
          <Example trigger="Show completion">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia status="success">
                  <IconCircleCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Import completed</AlertDialogTitle>
                <AlertDialogDescription>All 128 records were imported successfully.</AlertDialogDescription>
              </AlertDialogHeader>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={saved} onCheckedChange={(value) => setSaved(value === true)} />
                Don’t show this confirmation again
              </label>
              <AlertDialogFooter>
                <AlertDialogCancel>Done</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="View receipt">
            <AlertDialogContent className="gap-5">
              <AlertDialogHeader>
                <AlertDialogMedia status="success">
                  <IconCircleCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Registration complete</AlertDialogTitle>
                <AlertDialogDescription>Your workspace is ready.</AlertDialogDescription>
              </AlertDialogHeader>
              <dl className="grid grid-cols-[1fr_auto] gap-2 text-sm">
                <dt className="text-muted-foreground">Workspace</dt>
                <dd>Northwind</dd>
                <dt className="text-muted-foreground">Plan</dt>
                <dd>Business</dd>
                <dt className="text-muted-foreground">Members</dt>
                <dd>12</dd>
                <dt className="text-muted-foreground">Reference</dt>
                <dd>WS-2048</dd>
                <dt className="text-muted-foreground">Status</dt>
                <dd>Active</dd>
              </dl>
              <AlertDialogFooter className="sm:justify-stretch">
                <AlertDialogCancel className="w-full">Back to workspace</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Review update">
            <AlertDialogContent className="overflow-hidden p-0">
              <AlertDialogHeader className="p-5">
                <AlertDialogMedia status="accent">
                  <IconDeviceDesktop />
                </AlertDialogMedia>
                <AlertDialogTitle>Update available</AlertDialogTitle>
                <AlertDialogDescription>A new version is ready to install.</AlertDialogDescription>
                <Badge variant="secondary" className="mt-2 w-fit">
                  Version 4.8.2
                </Badge>
              </AlertDialogHeader>
              <div className="border-t bg-muted/50 p-5">
                <p className="mb-4 text-sm text-muted-foreground">
                  The update includes security improvements and requires restarting the console.
                </p>
                <AlertDialogFooter className="-mx-5 -mb-5">
                  <AlertDialogCancel>Later</AlertDialogCancel>
                  <AlertDialogAction>Restart now</AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Review subscription">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia status="danger">
                  <IconBellRinging />
                </AlertDialogMedia>
                <AlertDialogTitle>Payment method expired</AlertDialogTitle>
                <AlertDialogDescription>
                  Your subscription expires soon. Update payment details to keep reports and integrations active.
                </AlertDialogDescription>
                <Badge variant="destructive" className="mt-2 w-fit">
                  Expires in 2 days
                </Badge>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Dismiss</AlertDialogCancel>
                <AlertDialogAction>Update payment</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Run security audit">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia status="accent">
                  <IconShieldCheck />
                </AlertDialogMedia>
                <AlertDialogTitle>Security review</AlertDialogTitle>
                <AlertDialogDescription>
                  Review the checks before applying the recommended changes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  Two-factor authentication <Badge variant="secondary">Done</Badge>
                </li>
                <li className="flex justify-between">
                  Admin access review <Badge variant="outline">Pending</Badge>
                </li>
                <li className="flex justify-between">
                  API key rotation <Badge variant="secondary">Done</Badge>
                </li>
              </ul>
              <AlertDialogFooter className="flex-col sm:flex-col">
                <AlertDialogAction className="w-full">Apply recommendations</AlertDialogAction>
                <AlertDialogCancel className="w-full">Review later</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Review access expiration">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia status="warning">
                  <IconAlertTriangle />
                </AlertDialogMedia>
                <AlertDialogTitle>Access review is due</AlertDialogTitle>
                <AlertDialogDescription>
                  Review administrator permissions before the scheduled workspace audit.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Remind me later</AlertDialogCancel>
                <AlertDialogAction>Review access</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Custom Motion" layout="grid2" span={2}>
        <div className="min-w-0">
          <Example trigger="Slide from bottom">
            <AlertDialogContent className="data-open:slide-in-from-bottom-4 data-closed:slide-out-to-bottom-4 motion-reduce:!animate-none">
              <AlertDialogHeader>
                <AlertDialogTitle>Review deployment?</AlertDialogTitle>
                <AlertDialogDescription>
                  The new version will be deployed to all workspace environments.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Deploy</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
        <div className="min-w-0">
          <Example trigger="Slide from top">
            <AlertDialogContent className="data-open:slide-in-from-top-4 data-closed:slide-out-to-top-4 motion-reduce:!animate-none">
              <AlertDialogHeader>
                <AlertDialogTitle>Rotate workspace keys?</AlertDialogTitle>
                <AlertDialogDescription>
                  Connected services will need the new credentials after rotation.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep current keys</AlertDialogCancel>
                <AlertDialogAction>Rotate keys</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </Example>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Custom Portal" span={2}>
        <PortalExample />
      </ComponentPreview>{" "}
    </>
  );
}

export function AlertDialogExamples() {
  return (
    <>
      <AlertDialogLayoutExamples />
      <AlertDialogDestructiveExamples />
      <AlertDialogBehaviorExamples />
      <AlertDialogFeedbackExamples />
    </>
  );
}
