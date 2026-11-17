"use client";
import * as React from "react";

import {
  Bell as IconBell,
  Bold as IconBold,
  Bookmark as IconBookmark,
  Check as IconCheck,
  Heart as IconHeart,
  Italic as IconItalic,
  Pin as IconPin,
  Repeat as IconRepeat,
  Share as IconShare,
  Strikethrough as IconStrikethrough,
  ThumbsUp as IconThumbUp,
  Underline as IconUnderline,
  Volume as IconVolume,
  VolumeOff as IconVolumeOff,
} from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Badge } from "@/components/roseui/badge";
import { Toggle } from "@/components/roseui/toggle";
import { Tooltip, TooltipTrigger } from "@/components/roseui/tooltip";
import { Button } from "@/components/ui/button";

const exampleGroups = [
  {
    title: "Variants",
    examples: [
      { title: "Default", index: 0 },
      { title: "Outline", index: 1 },
    ],
  },
  {
    title: "Sizes",
    examples: [
      { title: "Text sizes", index: 2 },
      { title: "Icon sizes", index: 14 },
    ],
  },
  {
    title: "Content",
    examples: [
      { title: "With icon", index: 5 },
      { title: "With badge", index: 6 },
    ],
  },
  {
    title: "Selection state",
    examples: [
      { title: "Controlled label", index: 9 },
      { title: "Icon swap", index: 8 },
    ],
  },
  {
    title: "Disabled",
    examples: [
      { title: "Disabled", index: 4 },
      { title: "Disabled states", index: 12 },
    ],
  },
  {
    title: "Async update",
    examples: [{ title: "Async update", index: 15 }],
  },
  {
    title: "With other actions",
    examples: [
      { title: "With buttons", index: 3 },
      { title: "Reaction group", index: 10 },
    ],
  },
  {
    title: "With tooltip",
    examples: [{ title: "With tooltip", index: 11 }],
  },
  {
    title: "Mute toggle",
    examples: [{ title: "Mute toggle", index: 13 }],
  },
] as const;

function ToggleDemo({ index }: { index: number }) {
  const [pinned, setPinned] = React.useState(false);
  const [hearted, setHearted] = React.useState(false);
  const [muted, setMuted] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [subscriptionPending, setSubscriptionPending] = React.useState(false);
  const [failNextSubscription, setFailNextSubscription] = React.useState(true);
  const [subscriptionMessage, setSubscriptionMessage] = React.useState("Release updates are not in your list.");
  const subscriptionPendingRef = React.useRef(false);
  const [reactions, setReactions] = React.useState({ like: false, repost: false, share: false, save: false });
  const changeReaction = (key: keyof typeof reactions) =>
    setReactions((current) => ({ ...current, [key]: !current[key] }));
  if (index === 0)
    return (
      <div className="flex flex-wrap gap-1">
        <Toggle defaultPressed={true} aria-label="Bold">
          <IconBold />
        </Toggle>
        <Toggle aria-label="Italic">
          <IconItalic />
        </Toggle>
        <Toggle aria-label="Underline">
          <IconUnderline />
        </Toggle>
      </div>
    );
  if (index === 1)
    return (
      <div className="flex gap-2">
        <Toggle variant="outline" aria-label="Italic">
          <IconItalic />
          Italic
        </Toggle>
        <Toggle variant="outline" aria-label="Bold">
          <IconBold />
          Bold
        </Toggle>
      </div>
    );
  if (index === 2)
    return (
      <div className="flex flex-wrap items-center gap-3">
        {(["sm", "default", "lg"] as const).map((size) => (
          <Toggle key={size} variant="outline" size={size} isIconOnly aria-label={`Bookmark ${size}`}>
            <IconBookmark />
          </Toggle>
        ))}
      </div>
    );
  if (index === 3)
    return (
      <div className="grid w-full max-w-xs gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Assign to me
          </Button>
          <Toggle variant="outline" size="sm">
            <IconBookmark />
            Bookmark
          </Toggle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Mark complete">
            <IconCheck />
          </Button>
          <Toggle variant="outline" className="size-9 p-0" aria-label="Bold">
            <IconBold />
          </Toggle>
        </div>
      </div>
    );
  if (index === 4)
    return (
      <div className="flex flex-wrap gap-3">
        <Toggle disabled>Default</Toggle>
        <Toggle disabled variant="outline">
          Outline
        </Toggle>
      </div>
    );
  if (index === 5)
    return (
      <Toggle variant="outline" aria-label="Bookmark">
        <IconBookmark />
        Bookmark
      </Toggle>
    );
  if (index === 6)
    return (
      <Toggle aria-label="Notifications" className="relative">
        <IconBell />
        <Badge
          variant="destructive"
          className="absolute -top-1.5 -right-1.5 size-4 justify-center p-0 group-aria-pressed/toggle:hidden"
        >
          3
        </Badge>
      </Toggle>
    );
  if (index === 8)
    return (
      <Toggle
        pressed={hearted}
        onPressedChange={setHearted}
        aria-label={hearted ? "Remove like" : "Like"}
        className={hearted ? "text-destructive" : ""}
      >
        <IconHeart className={hearted ? "fill-current" : ""} />
      </Toggle>
    );
  if (index === 9)
    return (
      <Toggle variant="outline" pressed={pinned} onPressedChange={setPinned} aria-label={pinned ? "Unpin" : "Pin"}>
        <IconPin />
        {pinned ? "Unpin" : "Pin"}
      </Toggle>
    );
  if (index === 10)
    return (
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: "like", label: "Like", Icon: IconThumbUp, count: 24 },
          { key: "repost", label: "Repost", Icon: IconRepeat, count: 8 },
          { key: "share", label: "Share", Icon: IconShare, count: 3 },
          { key: "save", label: "Bookmark", Icon: IconBookmark, count: 12 },
        ].map(({ key, label, Icon, count }) => (
          <div key={key} className="flex items-center gap-1">
            <Toggle
              variant="outline"
              size="sm"
              pressed={reactions[key as keyof typeof reactions]}
              onPressedChange={() => changeReaction(key as keyof typeof reactions)}
              aria-label={label}
            >
              <Icon />
            </Toggle>
            <span className="text-xs tabular-nums text-muted-foreground">
              {count + Number(reactions[key as keyof typeof reactions])}
            </span>
          </div>
        ))}
      </div>
    );
  if (index === 11)
    return (
      <>
        <TooltipTrigger delayDuration={0}>
          <Toggle variant="outline" aria-label="Pin to sidebar">
            <IconPin />
          </Toggle>

          <Tooltip>Pin to sidebar</Tooltip>
        </TooltipTrigger>
      </>
    );
  if (index === 12)
    return (
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          <Toggle defaultPressed={true} aria-label="Bold">
            <IconBold />
          </Toggle>
          <Toggle aria-label="Italic">
            <IconItalic />
          </Toggle>
        </div>
        <div className="flex gap-1">
          <Toggle variant="outline" aria-label="Underline">
            <IconUnderline />
          </Toggle>
          <Toggle variant="outline" aria-label="Strikethrough">
            <IconStrikethrough />
          </Toggle>
        </div>
        <Toggle disabled aria-label="Disabled bold">
          <IconBold />
        </Toggle>
        <Toggle disabled variant="outline" aria-label="Disabled italic">
          <IconItalic />
        </Toggle>
      </div>
    );
  if (index === 13)
    return (
      <Toggle
        variant="outline"
        size="lg"
        pressed={muted}
        onPressedChange={setMuted}
        aria-label={muted ? "Unmute audio" : "Mute audio"}
      >
        {muted ? <IconVolumeOff /> : <IconVolume />}
        {muted ? "Muted" : "Sound"}
      </Toggle>
    );
  if (index === 14)
    return (
      <div className="flex items-center gap-2">
        {(["sm", "default", "lg"] as const).map((size) => (
          <Toggle key={size} variant="outline" size={size} isIconOnly aria-label={`Bookmark ${size}`}>
            <IconBookmark />
          </Toggle>
        ))}
      </div>
    );
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle
        variant="outline"
        pressed={subscribed}
        aria-label="Subscribe to release updates"
        aria-busy={subscriptionPending}
        aria-disabled={subscriptionPending}
        onPressedChange={(next) => {
          if (subscriptionPendingRef.current) return;
          subscriptionPendingRef.current = true;
          setSubscriptionPending(true);
          setSubscriptionMessage("");
          window.setTimeout(() => {
            if (next && failNextSubscription) {
              setFailNextSubscription(false);
              setSubscriptionMessage("Could not update the list. Activate again to retry.");
            } else {
              setSubscribed(next);
              setSubscriptionMessage(next ? "Release updates are in your list." : "Release updates were removed.");
            }
            subscriptionPendingRef.current = false;
            setSubscriptionPending(false);
          }, 650);
        }}
      >
        {subscriptionPending ? "Updating…" : subscribed ? "Subscribed" : "Subscribe"}
      </Toggle>
      <p
        role={subscriptionMessage.startsWith("Could not") ? "alert" : "status"}
        aria-live="polite"
        className="text-xs text-muted-foreground"
      >
        {subscriptionMessage || "Saving your preference…"}
      </p>
    </div>
  );
}

export function ToggleExamples() {
  return (
    <>
      {exampleGroups.map((group) => (
        <ComponentPreview key={group.title} title={group.title} layout="inline">
          {group.examples.map((example) => (
            <ToggleDemo key={example.title} index={example.index} />
          ))}
        </ComponentPreview>
      ))}
    </>
  );
}
