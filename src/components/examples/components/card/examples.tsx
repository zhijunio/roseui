"use client";
import { useState } from "react";

import { IconArrowRight, IconChevronDown, IconDotsVertical, IconExternalLink } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserAvatar } from "@/data/user";

const styleOne = [
  {
    title: "Innovative renewable energy",
    image: "/images/component-demos/abstract-01.svg",
    description: "Exploring breakthrough technologies in solar and wind power to enhance global energy access.",
  },
  {
    title: "Circular Economy Models",
    image: "/images/component-demos/abstract-04.svg",
    description: "Implementing strategies that promote product lifecycle extension and waste minimization.",
  },
];

const styleTwo = {
  title: "Sustainability in Tech",
  date: "March 3, 2028",
  image: "/images/component-demos/abstract-03.svg",
  description: "Assessing eco-friendly practices to reduce carbon footprints in product development.",
  author: "John Doe",
  avatar: getUserAvatar("John Doe"),
};

const styleHorizontal = {
  title: "Material Library Refresh",
  image: "/images/component-demos/abstract-02.svg",
  description: "Keep surface samples and finish notes together for the next product review.",
};

const styleThree = {
  title: "AI Ethics",
  category: "Analysis",
  date: "March 3, 2028",
  image: "/images/component-demos/abstract-04.svg",
  description: "Exploring the moral challenges and responsibilities in artificial intelligence deployment.",
};

const styleFour = {
  title: "Product Launch Checklist",
  category: "Planning",
  date: "Aug 14, 2028",
  description: "Track launch readiness across product, support, and customer communications.",
  author: "Sofia Rossi",
  avatar: getUserAvatar("Sofia Rossi"),
};

export function CardsExample() {
  return (
    <>
      <ComponentPreview title="Default Card" layout="panel">
        <Card className="w-full max-w-md gap-0">
          <CardHeader className="border-b">
            <CardTitle>API access</CardTitle>
            <p className="text-sm text-muted-foreground">Manage credentials for this workspace.</p>
          </CardHeader>
          <CardContent className="py-4">
            <p className="text-sm">
              Last rotated <time dateTime="2026-10-28">October 28, 2026</time>
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">1 active key</span>
            <Button size="sm" variant="outline">
              Manage keys
            </Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Prominence Variants" layout="panel">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          {(
            [
              { variant: "transparent", title: "Transparent", description: "Minimal emphasis for supporting content." },
              { variant: "default", title: "Default", description: "The standard surface for most content." },
              { variant: "secondary", title: "Secondary", description: "A softer surface for grouped information." },
              { variant: "tertiary", title: "Tertiary", description: "A stronger surface to distinguish key content." },
            ] as const
          ).map((item) => (
            <Card key={item.variant} variant={item.variant} className="gap-2 p-4">
              <CardTitle className="text-sm">{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Image on Top" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-transparent p-0 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleOne[0].title}
            className="aspect-video w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleOne[0].image})` }}
          />
          <CardHeader className="p-0 pt-3">
            <CardTitle className="mt-0 text-base leading-7 font-semibold tracking-[-0.2px]">
              {styleOne[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pt-1 pb-0 text-sm leading-5 text-muted-foreground">
            {styleOne[0].description}
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Horizontal Media" layout="panel">
        <Card className="flex w-full max-w-lg flex-col gap-0 overflow-hidden p-0 sm:flex-row">
          <div
            role="img"
            aria-label={styleHorizontal.title}
            className="aspect-[16/9] w-full shrink-0 bg-cover bg-center sm:aspect-auto sm:w-36"
            style={{ backgroundImage: `url(${styleHorizontal.image})` }}
          />
          <CardContent className="flex flex-1 flex-col justify-center gap-2 p-4">
            <CardTitle className="text-sm">{styleHorizontal.title}</CardTitle>
            <p className="line-clamp-2 text-sm text-muted-foreground">{styleHorizontal.description}</p>
            <Button variant="link" className="h-auto self-start p-0">
              Read more <IconArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Linked Media" layout="panel">
        <Card className="group/card w-full max-w-sm p-0">
          <div
            role="img"
            aria-label="Operations team reviewing a project dashboard"
            className="aspect-video rounded-t-xl bg-[url('/images/component-demos/abstract-03.svg')] bg-cover bg-center transition-transform duration-300 group-hover/card:scale-[1.03] motion-reduce:!transition-none"
          />
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <CardTitle>Operations review</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">Project Atlas · Updated today</p>
            </div>
            <Button size="icon" variant="ghost" aria-label="Open operations review">
              <IconArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Overlay Hero" layout="panel">
        <Card className="relative min-h-52 w-full max-w-sm justify-end overflow-hidden border-0 p-0 text-white">
          <div
            role="img"
            aria-label="Abstract blue data visualization"
            className="absolute inset-0 bg-[url('/images/component-demos/abstract-04.svg')] bg-cover bg-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          />
          <CardContent className="relative z-10 space-y-2 p-5">
            <Badge variant="secondary">Release 3.4</Badge>
            <CardTitle className="text-white">Platform update</CardTitle>
            <p className="text-sm text-white/80">Reliability improvements are ready for review.</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Article Metadata" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-transparent p-0 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleThree.title}
            className="h-24 w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleThree.image})` }}
          />
          <CardContent className="space-y-3 p-0 pt-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{styleThree.category}</Badge>
              <span aria-hidden="true" className="size-1 rounded-full bg-muted" />
              <span className="text-xs text-muted-foreground">{styleThree.date}</span>
            </div>
            <CardTitle className="block text-base leading-7 font-semibold tracking-[-0.2px]">
              {styleThree.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{styleThree.description}</p>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Author Byline" layout="panel">
        <Card className="w-full max-w-sm gap-0 border-0 bg-muted/50 p-2 shadow-none ring-0">
          <div
            role="img"
            aria-label={styleTwo.title}
            className="aspect-[16/10] w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${styleTwo.image})` }}
          />
          <CardContent className="space-y-3 px-3 py-2">
            <p className="text-xs text-muted-foreground">{styleTwo.date}</p>
            <h3 className="text-base leading-7 font-semibold tracking-[-0.2px]">{styleTwo.title}</h3>
            <p className="text-sm text-muted-foreground">{styleTwo.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Avatar size="xs">
                <AvatarImage src={styleTwo.avatar} alt={styleTwo.author} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {styleTwo.author}
            </div>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Author Footer" layout="panel">
        <Card className="flex w-full max-w-sm flex-col gap-0 rounded-xl border-0 bg-muted/50 p-2 shadow-none ring-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{styleFour.category}</p>
            <p className="text-sm text-muted-foreground">{styleFour.date}</p>
          </div>
          <div className="mt-5 flex-1">
            <CardTitle className="text-lg leading-7 font-semibold tracking-[-0.2px]">{styleFour.title}</CardTitle>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">{styleFour.description}</p>
          </div>
          <div className="mt-3 flex min-h-10 items-center justify-between gap-3 rounded-lg bg-background px-2 py-1.5">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={styleFour.avatar} alt={styleFour.author} />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <span className="truncate text-sm text-muted-foreground">{styleFour.author}</span>
            </div>
            <Button variant="link" className="h-auto shrink-0 gap-2 p-0 text-sm font-medium text-foreground">
              Read More <IconArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </ComponentPreview>
    </>
  );
}

export function CardExamples() {
  return (
    <>
      <CardsExample />
      <CardInteractiveExamples />
    </>
  );
}

export function CardInteractiveExamples() {
  const [expanded, setExpanded] = useState(false);
  const [inviteRequested, setInviteRequested] = useState(false);

  return (
    <>
      <ComponentPreview title="Header Actions" layout="panel">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Deployment summary</CardTitle>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" aria-label="Deployment actions">
                    <IconDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit details</DropdownMenuItem>
                  <DropdownMenuItem>Copy deployment link</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">Archive deployment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-success" />
              Healthy
            </span>
            <span className="text-sm text-muted-foreground">Production · v3.4.2</span>
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Expandable Footer" layout="panel">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Monthly usage</CardTitle>
            <p className="text-sm text-muted-foreground">Your plan resets in 8 days.</p>
            <CardAction>
              <Badge variant="secondary">Pro plan</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>API requests</span>
              <span>82,400 / 100,000</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[82%] rounded-full bg-primary" />
            </div>
            {expanded && (
              <div className="grid gap-2 border-t border-border pt-3 text-sm text-muted-foreground">
                <p>Requests this month: 82,400</p>
                <p>Estimated overage: $0.00</p>
                <Button variant="link" className="h-auto justify-start p-0">
                  View usage details <IconExternalLink />
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show less" : "Show usage details"}
              <IconChevronDown className={expanded ? "rotate-180" : ""} />
            </Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Form Card" layout="panel">
        <Card className="w-full max-w-md">
          <form
            className="flex flex-1 flex-col gap-(--card-spacing)"
            onSubmit={(event) => {
              event.preventDefault();
              setInviteRequested(true);
            }}
          >
            <CardHeader>
              <CardTitle>Join the creator program</CardTitle>
              <p className="text-sm text-muted-foreground">Request an invite to share your work with the community.</p>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Label htmlFor="creator-program-email">Email address</Label>
              <Input
                id="creator-program-email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={() => setInviteRequested(false)}
              />
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <span aria-live="polite" className="text-xs text-muted-foreground">
                {inviteRequested ? "Invite request received." : "No spam. Unsubscribe at any time."}
              </span>
              <Button type="submit" size="sm">
                Request invite
              </Button>
            </CardFooter>
          </form>
        </Card>
      </ComponentPreview>
    </>
  );
}
