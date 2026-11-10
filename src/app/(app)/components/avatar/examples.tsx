"use client";

import { people } from "@/data/avatar-data";
import { ComponentPreview, type ComponentPreviewLayout } from "@/components/composite/component-preview";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IconCheck, IconSelector, IconUser, IconRosetteDiscountCheck, IconLoader2 } from "@tabler/icons-react";
import { useId, useState, type ComponentProps, type ReactNode } from "react";

type ExampleSection = {
  title: string;
  description?: string;
  examples: number[];
  stack?: boolean;
  columns?: 2 | 3;
  layout?: ComponentPreviewLayout;
  span?: 1 | 2;
};



const sections: ExampleSection[] = [
  { title: "Appearance", examples: [1, 4, 13, 17, 33], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Sizes", examples: [3, 5], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Fallback & Color", examples: [2, 14, 15, 36, 37], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Status", examples: [6, 7, 8, 9, 31, 32, 34], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "States", examples: [30], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "With Details", examples: [16, 19, 26, 27, 35], stack: true, layout: "wide" as const, span: 2 as const },
];



const exampleLabels: Record<number, string> = {
  1: "Profile photo", 4: "Shapes", 13: "Outlined", 17: "Grayscale", 33: "Gradient ring",
  3: "Size scale", 5: "Custom dimensions",
  2: "Icon fallback", 14: "Soft initials", 15: "Solid initials", 36: "Semantic colors", 37: "Soft colors",
  6: "Online", 7: "Verified", 8: "Badge positions", 9: "Badge on a square avatar", 31: "Verified badge", 32: "Animated status", 34: "Notification count",
  30: "Loading state",
  16: "Profile details", 19: "Member button", 26: "Rounded member button", 27: "Primary member button", 35: "Account menu",
};



export function AvatarExamples() {
  return <>{sections.map((section) => {
        const renderExample = (example: number) => <AvatarExample example={example} />;
        const labelForExample = (example: number) => exampleLabels[example];
        const isStack = section.stack === true;
        const layout = section.layout ?? (isStack ? "stack" : "inline");
        const columns = section.columns;
        const previewClassName = columns === 3
          ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
          : columns === 2
            ? "grid items-stretch gap-4 sm:grid-cols-2"
            : isStack
              ? "flex-col flex-nowrap items-stretch gap-6"
              : undefined;
        return (
          <ComponentPreview previewId="avatar-01"
            key={section.title}
            title={section.title}

            span={section.span ?? 1}
            layout={layout}
            previewClassName={previewClassName}
          >
            {section.examples.map((example) => {
              const label = labelForExample?.(example);
              return (
                <div key={example} className={isStack ? "min-w-0 w-full space-y-2" : "min-w-0"}>
                  {isStack && label ? <p className="text-xs font-medium text-muted-foreground">{label}</p> : null}
                  {renderExample(example)}
                </div>
              );
            })}
          </ComponentPreview>
        );
      })}</>;
}


function PersonAvatar({ person = people[0], fallbackOnly, fallbackColor, fallbackVariant, imageClassName, children, className, ...props }: ComponentProps<typeof Avatar> & { person?: typeof people[number]; fallbackOnly?: boolean; fallbackColor?: ComponentProps<typeof AvatarFallback>["color"]; fallbackVariant?: ComponentProps<typeof AvatarFallback>["variant"]; imageClassName?: string; children?: ReactNode }) {
  return <Avatar role="img" aria-label={person.name} className={className} {...props}>{!fallbackOnly && <AvatarImage src={person.avatar} alt="" className={imageClassName} />}<AvatarFallback color={fallbackColor} variant={fallbackVariant} className={cn(imageClassName, !fallbackColor && "text-inherit")}>{getInitials(person.name)}</AvatarFallback>{children}</Avatar>;
}



export function AvatarExample({ example }: { example: number }) {
  const haloGradientId = useId();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  if ([3,5].includes(example)) return <div className="flex flex-wrap items-end gap-5">{(["xs","sm","default","lg","xl"] as const).map((size,index) => <PersonAvatar key={size} size={size} className={example === 5 ? ["size-5","size-9","size-14","size-18","size-24"][index] : undefined} />)}</div>;
  if (example === 4) return <div className="flex gap-4">{["rounded-none after:rounded-none","rounded-md after:rounded-md","rounded-xl after:rounded-xl","rounded-full"].map(radius => <PersonAvatar key={radius} className={radius} imageClassName={radius.split(" ")[0]} />)}</div>;
  if ([8,9,31].includes(example)) return <div className="flex gap-6">{["top-0 right-0","top-auto bottom-0 right-0","right-auto top-0 left-0","top-auto right-auto bottom-0 left-0"].map((position,index) => <PersonAvatar key={position} person={people[index]} size="lg" className={example === 9 ? "rounded-md after:rounded-md" : undefined} imageClassName={example === 9 ? "rounded-md" : undefined}><AvatarBadge className={cn(position, example === 31 ? "size-4! bg-background text-primary" : "bg-primary")} aria-label={(example === 31 ? "Verified" : "Online")}>{example === 31 && <IconRosetteDiscountCheck className="size-4!" />}</AvatarBadge></PersonAvatar>)}</div>;
  if ([2,14,15].includes(example)) return <div className="flex gap-4">{people.slice(0,3).map((person,index) => <PersonAvatar key={person.id} person={person} fallbackOnly className={cn(example === 14 && ["text-primary [&>[data-slot=avatar-fallback]]:bg-primary/10","text-primary [&>[data-slot=avatar-fallback]]:bg-primary/10","text-destructive [&>[data-slot=avatar-fallback]]:bg-destructive/10"][index], example === 15 && "text-primary-foreground [&>[data-slot=avatar-fallback]]:bg-primary")} />)}{example === 2 && <Avatar aria-label={"User"}><AvatarFallback><IconUser className="size-4" /></AvatarFallback></Avatar>}</div>;
  if ([36,37].includes(example)) return <div className="flex flex-wrap gap-3">{(["default", "primary", "success", "warning", "destructive"] as const).map((color, index) => <PersonAvatar key={color} person={people[index]} fallbackOnly fallbackColor={color} fallbackVariant={example === 36 ? "solid" : "soft"} />)}</div>;
  if ([19,26,27].includes(example)) return <Button variant={example === 27 ? "default" : "outline"} size="sm" className={example === 19 ? undefined : "rounded-full"} onClick={() => setAction(people[0].name)}><PersonAvatar size="xs" />{action || people[0].name}</Button>;
  if (example === 16) return <div className="flex items-center gap-3"><PersonAvatar size="lg"><AvatarBadge aria-label={"Online"} className="bg-primary" /></PersonAvatar><div><p className="text-sm font-medium">{people[0].name}</p><p className="text-xs text-muted-foreground">{"Product designer"}</p></div><span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{"Pro"}</span></div>;
  if (example === 30) return <div className="flex items-center gap-4"><div className="relative" aria-busy={loading}><PersonAvatar size="lg" />{loading && <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80"><IconLoader2 className="size-5 motion-safe:animate-spin" aria-label={"Loading avatar"} /></span>}</div><Button variant="outline" size="sm" onClick={() => setLoading(!loading)}>{(loading ? "Finish loading" : "Load avatar")}</Button></div>;
  if (example === 33)
    return (
      <div className="group relative inline-flex size-[3.25rem] items-center justify-center">
        <svg
          aria-hidden
          className="avatar-catalog-halo-ring pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 52 52"
        >
          <defs>
            <linearGradient id={haloGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="50%" stopColor="var(--color-accent)" />
              <stop offset="100%" stopColor="var(--color-primary)" />
            </linearGradient>
          </defs>
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke={`url(#${haloGradientId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="100 50"
          />
        </svg>
        <PersonAvatar
          size="lg"
          className="relative z-10 bg-background motion-safe:transition-transform motion-safe:group-hover:scale-95"
        />
      </div>
    );
  if (example === 35) return <div className="space-y-2"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="rounded-full"><PersonAvatar size="xs" />{people[0].name}<IconSelector aria-hidden /></Button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuLabel>{"Management"}</DropdownMenuLabel>{[{ id: "profile", label: "Profile" }, { id: "settings", label: "Settings" }, { id: "team", label: "Project team" }, { id: "invite", label: "Invite teammate" }].map(({ id, label }) => <DropdownMenuItem key={id} onSelect={() => setAction(label)}>{label}</DropdownMenuItem>)}<DropdownMenuSeparator /><DropdownMenuItem variant="destructive" onSelect={() => setAction("Log out")}>{"Log out"}</DropdownMenuItem></DropdownMenuContent></DropdownMenu><p role="status" className="text-xs text-muted-foreground">{action}</p></div>;
  return <PersonAvatar size="lg" imageClassName={example === 17 ? "grayscale" : undefined} className={cn(example === 13 && "ring-2 ring-ring ring-offset-2 ring-offset-background", example === 32 && "ring-2 ring-ring ring-offset-2 ring-offset-background motion-safe:animate-pulse")}>
    {[6,7,32,34].includes(example) && <AvatarBadge className="bg-primary" aria-label={(example === 7 ? "Verified" : "Online")}>{example === 7 && <IconCheck aria-hidden />}</AvatarBadge>}
    {example === 34 && <span aria-label={`${3} unread notifications`} className="absolute -bottom-1 -left-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-destructive text-xs text-white">3</span>}
  </PersonAvatar>;
}
