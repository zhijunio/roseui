"use client";

import { useState } from "react";

import { IconAlertTriangle, IconCheck, IconInfoCircle, IconMessageCircle } from "@tabler/icons-react";

import { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { users } from "@/data/user";
import { ComponentPreview, type ComponentPreviewLayout } from "@/examples/component-preview";
import { getInitials } from "@/lib/utils";

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
  { title: "Appearance", examples: [30], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Status", examples: [14, 15, 16, 19, 11, 28], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Content", examples: [20, 21], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Dismissible", examples: [18], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Processing", examples: [27], stack: true, layout: "wide" as const, span: 2 as const },
  {
    title: "Actions",
    examples: [12, 13, 17, 22, 23, 24, 25, 26, 29],
    stack: true,
    layout: "wide" as const,
    span: 2 as const,
  },
];

const exampleLabels: Record<number, string> = {
  30: "Outlined and solid",
  11: "Grouped status",
  12: "Message with reply",
  13: "Usage threshold with progress",
  14: "Notice without icon",
  15: "Security update",
  16: "Payment failure",
  17: "Important information",
  18: "Dismissible success",
  19: "Inverted notification",
  20: "Title only",
  21: "Description only",
  22: "System update",
  23: "Subscription expiring",
  24: "API latency",
  25: "Advanced analytics",
  26: "Connection error and retry",
  27: "Pending request",
  28: "Scheduled maintenance",
  29: "Pro feature notice",
};

function renderAlertExample(example: number) {
  if (example === 27) return <HeroUIAlertExample example={5} />;
  if (example === 28) return <HeroUIAlertExample example={6} />;
  return <AlertExample example={example} />;
}

export function AlertExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = renderAlertExample;
        const labelForExample = (example: number) => exampleLabels[example];
        const isStack = section.stack === true;
        const layout = section.layout ?? (isStack ? "stack" : "inline");
        const columns = section.columns;
        const previewClassName =
          columns === 3
            ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : columns === 2
              ? "grid items-stretch gap-4 sm:grid-cols-2"
              : isStack
                ? "flex-col flex-nowrap items-stretch gap-6"
                : undefined;
        return (
          <ComponentPreview
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
      })}
    </>
  );
}

function GroupedStatusAlerts() {
  return (
    <div className="w-full space-y-3">
      <Alert variant="success">
        <IconCheck aria-hidden="true" />
        <AlertContent>
          <AlertTitle>Deployment successful</AlertTitle>
          <AlertDescription>The latest build is ready for your team.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert variant="warning">
        <IconAlertTriangle aria-hidden="true" />
        <AlertContent>
          <AlertTitle>Elevated API latency</AlertTitle>
          <AlertDescription>Requests are slower than usual. The team is investigating.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  );
}

function MessageAlert() {
  const [replyOpen, setReplyOpen] = useState(false);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);
  const [viewed, setViewed] = useState(false);
  const person = users[0];
  return (
    <Alert variant="default" className="has-data-[slot=alert-action]:pr-4">
      <Avatar>
        <AvatarImage src={person.avatar} alt="" />
        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
      </Avatar>
      <AlertContent>
        <AlertTitle>
          <span className="font-semibold">{person.name}</span> sent you a message
        </AlertTitle>
        <AlertDescription>
          The updated dashboard is ready for your review.
          {viewed && (
            <span role="status" className="mt-2 block">
              Message opened.
            </span>
          )}
          {sent && (
            <span role="status" className="mt-2 block">
              Reply sent.
            </span>
          )}
        </AlertDescription>
        <AlertAction className="static mt-3 flex gap-2">
          <Button size="xs" variant="outline" onClick={() => setViewed(true)}>
            View message
          </Button>
          <Button size="xs" onClick={() => setReplyOpen((open) => !open)}>
            <IconMessageCircle aria-hidden="true" />
            {replyOpen ? "Cancel reply" : "Reply"}
          </Button>
        </AlertAction>
        {replyOpen && (
          <form
            className="mt-3 w-full space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (reply.trim()) {
                setSent(true);
                setReplyOpen(false);
              }
            }}
          >
            <label className="grid gap-1 text-xs">
              Reply
              <Textarea
                required
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                size="sm"
                autoResize={false}
                className="min-h-16"
              />
            </label>
            <Button size="xs" type="submit">
              Send reply
            </Button>
          </form>
        )}
      </AlertContent>
    </Alert>
  );
}

function UsageLimitAlert() {
  const [managed, setManaged] = useState(false);
  return (
    <Alert variant="warning" className="has-data-[slot=alert-action]:pr-4">
      <IconAlertTriangle aria-hidden="true" />
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span>8.4 GB of 10 GB used</span>
              <span className="tabular-nums">84%</span>
            </div>
            <Progress value={84} size="sm" aria-label="Storage usage" />
            {managed && (
              <span role="status" className="block">
                Storage settings opened.
              </span>
            )}
          </div>
        </AlertDescription>
        <AlertAction className="static mt-3">
          <Button size="xs" onClick={() => setManaged(true)}>
            Manage storage
          </Button>
        </AlertAction>
      </AlertContent>
    </Alert>
  );
}

type ActionKind =
  | "security"
  | "payment"
  | "notice"
  | "update"
  | "subscription"
  | "latency"
  | "analytics"
  | "connection";

function ActionAlert({ kind }: { kind: ActionKind }) {
  const [feedback, setFeedback] = useState("");
  const [visible, setVisible] = useState(true);
  const content = {
    security: {
      variant: "info" as const,
      icon: <IconInfoCircle aria-hidden="true" />,
      title: "Security update",
      description: "Update your password and enable two-factor authentication.",
      action: "Update",
      result: "Demo security preferences updated.",
    },
    payment: {
      variant: "destructive" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "Payment failed",
      description: "Review your payment details:",
      action: "Try again",
      result: "Payment retry started.",
    },
    notice: {
      variant: "info" as const,
      icon: <IconInfoCircle aria-hidden="true" />,
      title: "Important information",
      description: "Review this workspace notice before continuing.",
      action: "View notice",
      result: "Workspace notice opened.",
    },
    update: {
      variant: "info" as const,
      icon: <IconInfoCircle aria-hidden="true" />,
      title: "System update",
      description: "A workspace update is available. Refresh to load the latest version.",
      action: "Refresh",
      result: "Refresh requested.",
    },
    subscription: {
      variant: "warning" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "Subscription expiring",
      description: "Your workspace subscription expires in 3 days.",
      action: "Review billing",
      result: "Billing review opened.",
    },
    latency: {
      variant: "warning" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "API latency warning",
      description: "Response times are above the normal range.",
      action: "Inspect",
      result: "Latest response time: 420 ms. No outage detected.",
    },
    analytics: {
      variant: "info" as const,
      icon: <IconInfoCircle aria-hidden="true" />,
      title: "Advanced analytics available",
      description: "Explore usage trends and compare reporting periods.",
      action: "View",
      result: "Compare periods, inspect usage, and export reports.",
    },
    connection: {
      variant: "destructive" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "Unable to connect",
      description: "Check the connection and try again.",
      action: "Retry",
      result: "Connection check started.",
    },
  }[kind];
  if (!visible)
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
        Restore alert
      </Button>
    );
  return (
    <Alert variant={content.variant} className="has-data-[slot=alert-action]:pr-4">
      {content.icon}
      <AlertContent>
        <AlertTitle>{content.title}</AlertTitle>
        <AlertDescription>
          {content.description}
          {kind === "payment" && (
            <ul className="mt-1 list-inside list-disc">
              <li>Card number and expiry</li>
              <li>Billing address</li>
              <li>Available funds</li>
            </ul>
          )}
          {kind === "connection" && (
            <ul className="mt-1 list-inside list-disc">
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
            </ul>
          )}
          {feedback && (
            <span role="status" className="mt-2 block">
              {feedback}
            </span>
          )}
        </AlertDescription>
        <AlertAction className="static mt-3 flex gap-2">
          {(kind === "notice" || kind === "security") && (
            <Button size="xs" variant="outline" onClick={() => setVisible(false)}>
              Dismiss
            </Button>
          )}
          {kind === "payment" && (
            <Button size="xs" variant="outline" onClick={() => setFeedback("Payment details opened.")}>
              Review details
            </Button>
          )}
          <Button size="xs" onClick={() => setFeedback(content.result)}>
            {content.action}
          </Button>
        </AlertAction>
      </AlertContent>
    </Alert>
  );
}

function DismissibleAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible)
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
        Restore alert
      </Button>
    );
  return (
    <Alert variant="success" className="has-data-[slot=alert-action]:pr-10">
      <IconCheck aria-hidden="true" />
      <AlertContent>
        <AlertTitle>Changes saved</AlertTitle>
        <AlertDescription>Your preferences have been updated.</AlertDescription>
      </AlertContent>
      <AlertAction>
        <CloseButton aria-label="Dismiss changes saved alert" size="xs" onClick={() => setVisible(false)} />
      </AlertAction>
    </Alert>
  );
}

function OptionalContentAlert({ title }: { title: boolean }) {
  const [feedback, setFeedback] = useState("");
  const [visible, setVisible] = useState(true);
  if (!visible)
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
        Restore alert
      </Button>
    );
  return (
    <Alert variant="info" className="has-data-[slot=alert-action]:pr-4">
      <IconInfoCircle aria-hidden="true" />
      <AlertContent>
        {title ? (
          <AlertTitle>Security update</AlertTitle>
        ) : (
          <AlertDescription>Update your password and enable two-factor authentication.</AlertDescription>
        )}
        {feedback && (
          <span role="status" className="text-sm text-muted-foreground">
            {feedback}
          </span>
        )}
        <AlertAction className="static mt-3 flex gap-2">
          <Button size="xs" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
          <Button size="xs" onClick={() => setFeedback("Demo security preferences updated.")}>
            Update
          </Button>
        </AlertAction>
      </AlertContent>
    </Alert>
  );
}

function ProFeatureAlert() {
  const [feedback, setFeedback] = useState("");
  return (
    <Alert variant="invert" className="has-data-[slot=alert-action]:pr-4">
      <IconInfoCircle aria-hidden="true" />
      <AlertContent>
        <AlertTitle>Pro feature</AlertTitle>
        <AlertDescription>Review available plans to access this feature.</AlertDescription>
        {feedback && (
          <span role="status" className="text-sm text-background/80">
            {feedback}
          </span>
        )}
        <AlertAction className="static mt-3">
          <Button
            size="xs"
            variant="outline"
            className="border-background/40 bg-transparent text-background hover:bg-background/10 hover:text-background dark:bg-transparent"
            onClick={() => setFeedback("Available plans opened.")}
          >
            Review plans
          </Button>
        </AlertAction>
      </AlertContent>
    </Alert>
  );
}

export function AlertExample({ example }: { example: number }) {
  if (example === 30) return <AlertAppearanceExamples />;
  if (example === 11) return <GroupedStatusAlerts />;
  if (example === 12) return <MessageAlert />;
  if (example === 13) return <UsageLimitAlert />;
  if (example === 14)
    return (
      <Alert variant="default">
        <AlertContent>
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>Review the latest workspace information.</AlertDescription>
        </AlertContent>
      </Alert>
    );
  if (example === 15) return <ActionAlert kind="security" />;
  if (example === 16) return <ActionAlert kind="payment" />;
  if (example === 17) return <ActionAlert kind="notice" />;
  if (example === 18) return <DismissibleAlert />;
  if (example === 19)
    return (
      <Alert variant="invert">
        <IconInfoCircle aria-hidden="true" />
        <AlertContent>
          <AlertTitle>Workspace notification</AlertTitle>
          <AlertDescription>Your workspace information is up to date.</AlertDescription>
        </AlertContent>
      </Alert>
    );
  if (example === 20) return <OptionalContentAlert title />;
  if (example === 21) return <OptionalContentAlert title={false} />;
  if (example === 22) return <ActionAlert kind="update" />;
  if (example === 23) return <ActionAlert kind="subscription" />;
  if (example === 24) return <ActionAlert kind="latency" />;
  if (example === 25) return <ActionAlert kind="analytics" />;
  if (example === 26) return <ActionAlert kind="connection" />;
  if (example === 29) return <ProFeatureAlert />;
  return null;
}

function AlertAppearanceExamples() {
  const examples = [
    {
      variant: "info" as const,
      icon: <IconInfoCircle aria-hidden="true" />,
      title: "New update",
      description: "A new version is available.",
    },
    {
      variant: "success" as const,
      icon: <IconCheck aria-hidden="true" />,
      title: "Payment successful",
      description: "Your payment has been processed.",
    },
    {
      variant: "warning" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "Subscription expiring",
      description: "Your plan expires in 3 days.",
    },
    {
      variant: "destructive" as const,
      icon: <IconAlertTriangle aria-hidden="true" />,
      title: "Connection failed",
      description: "Check your connection and try again.",
    },
  ];
  return (
    <div className="space-y-5">
      {(["outline", "solid"] as const).map((appearance) => (
        <section key={appearance} className="space-y-2.5">
          <h3 className="text-sm font-medium capitalize text-foreground">{appearance}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {examples.map(({ variant, icon, title, description }) => (
              <Alert key={`${appearance}-${variant}`} variant={variant} appearance={appearance}>
                {icon}
                <AlertContent>
                  <AlertTitle>{title}</AlertTitle>
                  <AlertDescription>{description}</AlertDescription>
                </AlertContent>
              </Alert>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function HeroUIAlertExample({ example }: { example: number }) {
  if (example === 5) {
    return (
      <Alert variant="info">
        <span className="flex items-center justify-center p-1">
          <Spinner size="sm" label="Processing" />
        </span>
        <AlertContent>
          <AlertTitle>Processing your request</AlertTitle>
          <AlertDescription>Please wait while we sync your data. This may take a few moments.</AlertDescription>
        </AlertContent>
      </Alert>
    );
  }
  if (example === 6) {
    return (
      <Alert variant="warning">
        <IconAlertTriangle aria-hidden="true" />
        <AlertContent>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            Our services will be unavailable Sunday from 2:00 to 6:00 AM UTC for scheduled maintenance.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  }
  return null;
}
