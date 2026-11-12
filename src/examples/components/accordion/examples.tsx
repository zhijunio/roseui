"use client";

import { useState } from "react";

import {
  IconBell,
  IconChevronDown,
  IconChevronRight,
  IconCreditCard,
  IconLock,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentPreview } from "@/examples/component-preview";
import { cn } from "@/lib/utils";

const accountItems = [
  { value: "profile", title: "Profile settings", content: "Manage your name, email address, and profile details." },
  {
    value: "security",
    title: "Security",
    content: "Review your password, active sessions, and two-factor authentication.",
  },
  { value: "notifications", title: "Notifications", content: "Choose which workspace updates you receive by email." },
];

const faqItems = {
  general: [
    {
      value: "getting-started",
      title: "How do I get started?",
      content: "Create a workspace, invite your team, and add the projects you want to manage.",
    },
    {
      value: "members",
      title: "Can I invite people to my workspace?",
      content: "Workspace owners and administrators can invite members from workspace settings.",
    },
  ],
  billing: [
    {
      value: "plans",
      title: "Can I change plans later?",
      content: "You can change your plan at any time. The new plan takes effect at the next billing date.",
    },
    {
      value: "payment",
      title: "Which payment methods are supported?",
      content: "We accept major credit and debit cards. Annual plans can also be paid by invoice.",
    },
  ],
};

export function SurfaceAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg overflow-hidden rounded-xl border bg-card px-4">
      {accountItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="py-4 hover:no-underline">{item.title}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function SingleItemAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg rounded-xl border bg-card px-4">
      <AccordionItem value="shipping">
        <AccordionTrigger className="py-4 hover:no-underline">Shipping details</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Orders ship within 2 business days. Standard delivery takes 3–5 business days; express delivery is available
          at checkout.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function NoSeparatorAccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      {accountItems.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="not-last:border-0">
          <AccordionTrigger className="py-3 hover:no-underline">{item.title}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function MutedAccordionExample() {
  return (
    <Accordion type="multiple" defaultValue={["notifications"]} className="w-full max-w-lg gap-3">
      {accountItems.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="overflow-hidden rounded-lg border bg-muted/40 px-3"
        >
          <AccordionTrigger className="py-3 hover:no-underline">{item.title}</AccordionTrigger>
          <AccordionContent className="border-t border-border text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function AccountDetailsAccordionExample() {
  const sections = [
    {
      value: "notifications",
      title: "Notifications",
      summary: "Email, push, and Slack",
      detail: "Choose which workspace events are sent to each channel.",
      icon: IconBell,
      badge: "3 channels",
    },
    {
      value: "security",
      title: "Security",
      summary: "Two-factor sign-in and sessions",
      detail: "Review authentication requirements and active sessions.",
      icon: IconLock,
      badge: "MFA",
    },
    {
      value: "billing",
      title: "Billing",
      summary: "Managed by your workspace owner",
      detail: "View the billing contact and current plan for this workspace.",
      icon: IconCreditCard,
    },
  ];

  return (
    <Accordion type="multiple" defaultValue={["notifications"]} className="w-full max-w-lg gap-3">
      {sections.map(({ value, title, summary, detail, icon: Icon, badge }) => (
        <AccordionItem key={value} value={value} className="rounded-lg border px-3">
          <AccordionTrigger className="items-center gap-3 py-3 hover:no-underline">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span className="grid min-w-0 flex-1 gap-0.5 text-left">
              <span className="font-medium">{title}</span>
              <span className="text-xs font-normal text-muted-foreground">{summary}</span>
            </span>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </AccordionTrigger>
          <AccordionContent className="pl-7 text-muted-foreground">{detail}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ArrowIndicatorAccordionExample() {
  const items = [
    {
      value: "project",
      title: "Can I change project settings?",
      content: "Project owners can update team access, notifications, and default views at any time.",
    },
    {
      value: "roles",
      title: "How are workspace roles assigned?",
      content: "Administrators assign roles from the member directory and can update them as responsibilities change.",
    },
    {
      value: "history",
      title: "Where can I review recent changes?",
      content: "Open the activity page to see a time-ordered record of workspace updates.",
    },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="project" className="w-full max-w-lg">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="flex-row-reverse items-center justify-end gap-3 py-3 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
            <span className="font-medium text-foreground/90">{item.title}</span>
            <IconChevronRight
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-90"
            />
          </AccordionTrigger>
          <AccordionContent className="pl-7 leading-relaxed text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function MultipleAccordionExample() {
  return (
    <Accordion type="multiple" defaultValue={["profile"]} className="w-full max-w-lg">
      {accountItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="hover:no-underline">{item.title}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function DisabledAccordionExample() {
  return (
    <div className="w-full max-w-lg space-y-5">
      <Accordion type="single" collapsible disabled>
        <AccordionItem value="workspace">
          <AccordionTrigger>Workspace settings</AccordionTrigger>
          <AccordionContent>These settings are currently unavailable.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="profile">
        <AccordionItem value="profile">
          <AccordionTrigger>Profile settings</AccordionTrigger>
          <AccordionContent>Update your name and profile details.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="security" disabled>
          <AccordionTrigger className="data-[disabled]:opacity-50">Security settings</AccordionTrigger>
          <AccordionContent>Only workspace owners can change this policy.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const controlledItems = [
  { value: "billing", title: "Billing", content: "View your current plan, invoices, and payment method." },
  { value: "members", title: "Members", content: "Manage workspace invitations and member access." },
  { value: "integrations", title: "Integrations", content: "Connect the tools your team uses every day." },
];

export function ControlledAccordionExample() {
  const [openItems, setOpenItems] = useState<string[]>(["billing"]);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setOpenItems(controlledItems.map(({ value }) => value))}>
          Expand all
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOpenItems([])}>
          Collapse all
        </Button>
      </div>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {controlledItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function CustomIndicatorAccordionExample() {
  return (
    <Accordion type="multiple" defaultValue={["profile"]} className="w-full max-w-lg">
      {accountItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="items-center hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
            <span>{item.title}</span>
            <IconPlus
              aria-hidden="true"
              className="ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden"
            />
            <IconMinus
              aria-hidden="true"
              className="ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline"
            />
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function RenderFunctionAccordionExample() {
  return (
    <Accordion type="single" collapsible defaultValue="plan" className="w-full max-w-lg">
      <AccordionItem value="plan">
        <AccordionTrigger
          render={(props) => (
            <button
              {...props}
              className={cn(props.className, "items-center gap-3 rounded-md bg-muted/40 px-3 py-2 hover:no-underline")}
            >
              <span className="min-w-0 flex-1">
                <span className="mb-0.5 block text-xs font-medium text-muted-foreground">Workspace plan</span>
                <span className="font-medium">{props.children}</span>
              </span>
              <IconChevronDown
                data-slot="accordion-trigger-icon"
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/accordion-trigger:rotate-180"
              />
            </button>
          )}
        >
          Review plan details
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Compare plan features and review your next renewal date.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>Manage seats</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Add or remove seats from your workspace billing settings.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function FaqAccordionExample() {
  return (
    <div className="grid w-full gap-x-8 sm:grid-cols-2">
      {Object.entries(faqItems).map(([category, items]) => (
        <section key={category}>
          <h3 className="mb-1 text-sm font-semibold capitalize">{category}</h3>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="py-4 text-left hover:no-underline">{item.title}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}

export function AccordionExamples() {
  return (
    <>
      <ComponentPreview title="Single Item">
        <SingleItemAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Surface">
        <SurfaceAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Muted Panels">
        <MutedAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Without Separator">
        <NoSeparatorAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Icons and Badges">
        <AccountDetailsAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Arrow Indicator">
        <ArrowIndicatorAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Custom Indicator">
        <CustomIndicatorAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Multiple Expanded">
        <MultipleAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Disabled State">
        <DisabledAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Controlled" span={2} layout="wide">
        <ControlledAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="Render Function">
        <RenderFunctionAccordionExample />
      </ComponentPreview>
      <ComponentPreview title="FAQ Layout" span={2} layout="wide">
        <FaqAccordionExample />
      </ComponentPreview>
    </>
  );
}
