"use client";

import { useEffect, useState } from "react";

import {
  IconArrowLeft,
  IconArrowRight,
  IconBolt,
  IconCalendarEvent,
  IconCircleCheck,
  IconCloud,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { getUserAvatar } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";

const releases = [
  {
    version: "v2.8.0",
    tag: "Current",
    date: "Nov 3",
    notes: "Usage dashboards now support saved filters and scheduled exports.",
  },
  {
    version: "v2.7.2",
    tag: "Maintenance",
    date: "Oct 21",
    notes: "Improved audit log search and API key rotation feedback.",
  },
  { version: "v2.7.0", tag: "Feature", date: "Oct 8", notes: "New role templates help admins onboard teams faster." },
];

export function HoverCardExamples() {
  const [releaseIndex, setReleaseIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [lastDeploy] = useState(() => new Date(Date.now() - 2 * 60 * 60 * 1000));
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const elapsedMinutes = Math.max(1, Math.floor((now.getTime() - lastDeploy.getTime()) / 60_000));
  const relativeTime =
    elapsedMinutes < 60
      ? `${elapsedMinutes} minute${elapsedMinutes === 1 ? "" : "s"} ago`
      : `${Math.floor(elapsedMinutes / 60)} hour${Math.floor(elapsedMinutes / 60) === 1 ? "" : "s"} ago`;
  const release = releases[releaseIndex];

  return (
    <>
      <ComponentPreview layout="fill" title="Basic Hover Card">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">View deployment details</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <h3 className="font-medium">Deployment preview</h3>
              <p className="mt-1 text-muted-foreground">
                Hover cards reveal supplementary details without interrupting the current task.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Placement Options">
        <div className="grid min-h-36 grid-cols-2 items-center gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <HoverCard key={side}>
              <HoverCardTrigger asChild>
                <Button className="w-full capitalize" variant="outline">
                  {side}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side={side}>
                <p className="font-medium">{side} placement</p>
                <p className="mt-1 text-muted-foreground">Position details on the {side} side of the trigger.</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Member Profile">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="flex items-center gap-2 rounded-md p-2 text-left hover:bg-muted">
                <Avatar className="size-9">
                  <AvatarImage src={getUserAvatar("Priya Nair")} alt="Priya Nair" />
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <span>
                  <span className="block text-sm font-medium">Priya Nair</span>
                  <span className="text-xs text-muted-foreground">@p.nair</span>
                </span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-3">
                <Avatar className="size-11">
                  <AvatarImage src={getUserAvatar("Priya Nair")} alt="Priya Nair" />
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Priya Nair</p>
                  <p className="text-xs text-muted-foreground">Product Design · 12 projects</p>
                  <p className="mt-2 text-muted-foreground">Lead Product Designer. Joined December 2023.</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <IconCalendarEvent className="size-3.5" /> Joined December 2023
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Feature Summary">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">
                <IconBolt className="size-4" /> Instant deployment
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex gap-3">
                <IconCloud className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Global edge network</p>
                  <p className="mt-1 text-muted-foreground">
                    Deploy services to regional edge locations and reduce latency for customers.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Image and Text">
        <div className="flex min-h-36 items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Preview report cover</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 overflow-hidden p-0">
              <div
                role="img"
                aria-label="Analytics dashboard displayed on a laptop"
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: "linear-gradient(135deg, #dbeafe, #2563eb)" }}
              />
              <div className="p-3">
                <p className="font-medium">Quarterly performance</p>
                <p className="mt-1 text-muted-foreground">A visual summary of revenue and customer growth.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Hover Card in Dialog">
        <div className="flex min-h-32 items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open project dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Project settings</DialogTitle>
              <DialogDescription>Inspect project ownership without leaving this dialog.</DialogDescription>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" className="mt-4 w-fit">
                    Platform migration
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="font-medium">Platform migration</p>
                  <p className="mt-1 text-muted-foreground">Owner: Infrastructure · Updated today</p>
                </HoverCardContent>
              </HoverCard>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Relative Deployment Time">
        <div className="flex min-h-32 items-center justify-center text-sm text-muted-foreground">
          Last deployed{" "}
          <HoverCard>
            <HoverCardTrigger className="mx-1 cursor-default underline decoration-dashed underline-offset-4 text-foreground">
              {relativeTime}
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-0">
              <p className="p-3 font-medium">Deployment completed {relativeTime}</p>
              <Separator />
              <div className="space-y-2 p-3 text-xs">
                <p className="flex items-center justify-between">
                  <Badge variant="outline">UTC</Badge>
                  <span>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(lastDeploy)}{" "}
                    · {lastDeploy.toLocaleTimeString("en-US", { timeZone: "UTC" })}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <IconCircleCheck className="size-4 text-primary" /> Local time: {now.toLocaleTimeString()}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          by the CI pipeline.
        </div>
      </ComponentPreview>
      <ComponentPreview layout="fill" title="Paginated Release Notes">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard>
            <HoverCardTrigger className="text-sm font-medium text-primary underline decoration-dashed underline-offset-4">
              What&apos;s new?
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">
                  {release.version}{" "}
                  <Badge variant="outline" className="ml-1">
                    {release.tag}
                  </Badge>
                </span>
                <span className="text-xs text-muted-foreground">{release.date}</span>
              </div>
              <p className="my-3 text-muted-foreground">{release.notes}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {releases.map((item, index) => (
                    <span
                      key={item.version}
                      className={`size-1.5 rounded-full ${index === releaseIndex ? "bg-primary" : "bg-muted/30"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Previous release"
                    disabled={releaseIndex === 0}
                    onClick={() => setReleaseIndex((index) => Math.max(0, index - 1))}
                  >
                    <IconArrowLeft className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Next release"
                    disabled={releaseIndex === releases.length - 1}
                    onClick={() => setReleaseIndex((index) => Math.min(releases.length - 1, index + 1))}
                  >
                    <IconArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Controlled Preview">
        <ControlledHoverCardExample />
      </ComponentPreview>
      <ComponentPreview title="Custom Delays">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard openDelay={700} closeDelay={350}>
            <HoverCardTrigger asChild>
              <Button variant="outline">Wait for the preview</Button>
            </HoverCardTrigger>
            <HoverCardContent showArrow side="top">
              <p className="font-medium">Delayed preview</p>
              <p className="mt-1 text-muted-foreground">
                This card opens after 700 ms and stays briefly while the pointer moves.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Arrow">
        <div className="flex min-h-32 items-center justify-center">
          <HoverCard openDelay={0}>
            <HoverCardTrigger asChild>
              <Button variant="outline">Preview project</Button>
            </HoverCardTrigger>
            <HoverCardContent showArrow side="top">
              <p className="font-medium">Project preview</p>
              <p className="mt-1 text-muted-foreground">The arrow connects this preview to its trigger.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </ComponentPreview>
    </>
  );
}

function ControlledHoverCardExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-32 flex-wrap items-center justify-center gap-3">
      <Button variant="outline" onClick={() => setOpen((value) => !value)}>
        {open ? "Hide preview" : "Show preview"}
      </Button>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild>
          <button className="rounded-md px-2 py-1 text-sm underline decoration-dashed underline-offset-4">
            Keyboard and pointer trigger
          </button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="font-medium">Controlled content</p>
          <p className="mt-1 text-muted-foreground">The parent controls this preview&apos;s open state.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
