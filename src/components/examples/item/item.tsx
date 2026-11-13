"use client";
import * as React from "react";

import {
  IconBell,
  IconBrandGithub,
  IconBrandSlack,
  IconCheck,
  IconChevronRight,
  IconCloud,
  IconDots,
  IconFileText,
  IconFolder,
  IconLayoutDashboard,
  IconMail,
  IconMessageCircle,
  IconMusic,
  IconPlugConnected,
  IconSettings,
  IconShield,
  IconVideo,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemGroupDescription,
  ItemGroupHeader,
  ItemGroupTitle,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import { Switch } from "@/components/ui/switch";
import { users as exampleUsers } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";
import { getInitials } from "@/lib/utils";

const examples = [
  "Basic item with title and description",
  "Items with icon media and action buttons",
  "User item with avatar, info, and follow button",
  "Clickable navigation items with icons and chevron",
  "Item group with status badges",
  "File items with icon media, size, and actions",
  "Items with keyboard shortcuts",
  "Small-size items with badges",
  "Team members with roles and multiple actions",
  "Integration items with connect actions",
  "Activity feed items with avatars and actions",
  "Card Surface",
  "With Switch",
  "Device Selection",
  "Card Grid",
  "Group Surfaces",
  "Group Heading and Dividers",
  "Item Surfaces",
  "Title Only",
];
const people = [exampleUsers[3], exampleUsers[4], exampleUsers[0]].map((person, index) => ({
  ...person,
  role: ["Product designer", "Engineering lead", "Operations"][index],
  initials: getInitials(person.name),
  image: person.avatar,
}));

function Person({ index, size = "size-9" }: { index: number; size?: string }) {
  const person = people[index % people.length];
  return (
    <Avatar className={size}>
      <AvatarImage src={person.image} alt="" />
      <AvatarFallback>{person.initials}</AvatarFallback>
    </Avatar>
  );
}

function ItemDemo({ index }: { index: number }) {
  const [following, setFollowing] = React.useState<string[]>(["RP"]);
  const [enabled, setEnabled] = React.useState<string[]>(["slack"]);
  const [roles, setRoles] = React.useState<Record<string, string>>({ jc: "Editor", rp: "Admin" });
  const [opened, setOpened] = React.useState("");
  const [preferences, setPreferences] = React.useState({ email: true, security: true, product: false });
  const [selectedDevices, setSelectedDevices] = React.useState(["laptop"]);
  const toggle = (list: string[], value: string, setter: (next: string[]) => void) =>
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  if (index === 0)
    return (
      <ItemGroup className="max-w-md gap-2">
        <Item>
          <ItemContent>
            <ItemTitle>Default item</ItemTitle>
            <ItemDescription>A compact row for one piece of workspace information.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Outlined item</ItemTitle>
            <ItemDescription>Use a border when the row needs a clear boundary.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Muted item</ItemTitle>
            <ItemDescription>A quieter surface for grouped settings.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    );
  if (index === 1)
    return (
      <ItemGroup className="max-w-md gap-2">
        {[
          { icon: <IconMail />, title: "Email digests", description: "Weekly workspace summary", action: "Configure" },
          {
            icon: <IconBell />,
            title: "Incident alerts",
            description: "Critical service notifications",
            action: "Enable",
          },
          {
            icon: <IconMessageCircle />,
            title: "Team mentions",
            description: "Activity that needs your attention",
            action: "Configure",
          },
        ].map((row) => (
          <Item key={row.title} variant="outline">
            <ItemMedia variant="icon">{row.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{row.title}</ItemTitle>
              <ItemDescription>{row.description}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="sm"
                variant={row.action === "Enable" ? "default" : "outline"}
                onClick={() => setOpened(row.title)}
              >
                {opened === row.title ? "Enabled" : row.action}
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 2)
    return (
      <ItemGroup className="max-w-md gap-1">
        {people.map((person, i) => (
          <Item key={person.name} size="sm">
            <ItemMedia variant="image">
              <Person index={i} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.role}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="sm"
                variant={following.includes(person.initials) ? "secondary" : "outline"}
                onClick={() => toggle(following, person.initials, setFollowing)}
              >
                {following.includes(person.initials) ? "Following" : "Follow"}
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 3)
    return (
      <ItemGroup className="max-w-sm gap-1">
        {[
          { icon: <IconSettings />, name: "Profile settings" },
          { icon: <IconShield />, name: "Security" },
          { icon: <IconFileText />, name: "Billing" },
        ].map((row, i) => (
          <React.Fragment key={row.name}>
            <Item size="sm" className="p-0">
              <a
                href={`#${row.name.toLowerCase().replaceAll(" ", "-")}`}
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ItemMedia>{row.icon}</ItemMedia>
                <span className="flex-1 font-medium">{row.name}</span>
                <IconChevronRight className="size-4 text-muted-foreground" />
              </a>
            </Item>
            {i < 2 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    );
  if (index === 4)
    return (
      <ItemGroup className="max-w-sm gap-2">
        {[
          { name: "Priya Nair", role: "Workspace admin", status: "Online", tone: "text-success bg-success/10" },
          { name: "Daniel Weber", role: "Project manager", status: "Away", tone: "text-warning bg-warning/10" },
          { name: "Alex Morgan", role: "Analyst", status: "Offline", tone: "text-muted-foreground bg-muted" },
        ].map((person, i) => (
          <Item key={person.name} variant="outline">
            <ItemMedia variant="image">
              <Person index={i} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.role}</ItemDescription>
            </ItemContent>
            <Badge variant="outline" className={person.tone}>
              {person.status}
            </Badge>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 5)
    return (
      <ItemGroup className="max-w-lg gap-1">
        {[
          { name: "Q4-product-brief.pdf", size: "2.4 MB · Updated today", state: "Final", icon: <IconFileText /> },
          { name: "Campaign-assets.zip", size: "18.2 MB · Updated yesterday", state: "Review", icon: <IconFolder /> },
          { name: "Demo-recording.mp4", size: "68 MB · Updated Nov 1", state: "Draft", icon: <IconVideo /> },
        ].map((file) => (
          <Item key={file.name} size="sm">
            <ItemMedia variant="icon">{file.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{file.name}</ItemTitle>
              <ItemDescription>{file.size}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant={file.state === "Final" ? "secondary" : "outline"}>{file.state}</Badge>
              <Button size="sm" variant="ghost" onClick={() => setOpened(file.name)}>
                {opened === file.name ? "Opened" : "Open"}
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 6)
    return (
      <ItemGroup className="max-w-sm gap-1">
        {[
          { icon: <IconLayoutDashboard />, name: "Overview", shortcut: "⌘ 1" },
          { icon: <IconFolder />, name: "Projects", shortcut: "⌘ 2" },
          { icon: <IconSettings />, name: "Settings", shortcut: "⌘ ," },
          { icon: <IconBell />, name: "Notifications", shortcut: "⌘ N" },
          { icon: <IconShield />, name: "Access control", shortcut: "⌘ ⇧ A" },
        ].map((row) => (
          <Item key={row.name} size="sm" className="rounded-md px-2 py-1.5 hover:bg-accent">
            <ItemMedia>{row.icon}</ItemMedia>
            <ItemTitle className="flex-1">{row.name}</ItemTitle>
            <Kbd>{row.shortcut}</Kbd>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 7)
    return (
      <ItemGroup className="max-w-xs gap-1">
        {[
          { name: "Inbox", count: "8" },
          { name: "Starred" },
          { name: "Snoozed" },
          { name: "Drafts", count: "2" },
          { name: "Sent" },
          { name: "Trash" },
        ].map((row) => (
          <Item key={row.name} size="xs" className="rounded-md hover:bg-accent">
            <ItemMedia>
              <IconMail className="size-4" />
            </ItemMedia>
            <ItemTitle className="flex-1">{row.name}</ItemTitle>
            {row.count && <Badge variant="secondary">{row.count}</Badge>}
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 8)
    return (
      <ItemGroup className="max-w-lg gap-1">
        {people.slice(0, 2).map((person, i) => (
          <Item key={person.name} size="sm" variant="outline">
            <ItemMedia variant="image">
              <Person index={i} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{person.name}</ItemTitle>
              <ItemDescription>{person.name.split(" ")[0].toLowerCase()}@northwind.dev</ItemDescription>
            </ItemContent>
            <select
              aria-label={`${person.name} role`}
              value={roles[person.initials.toLowerCase()] ?? "Viewer"}
              onChange={(event) => setRoles({ ...roles, [person.initials.toLowerCase()]: event.target.value })}
              className="h-7 rounded-md border border-input bg-background px-2 text-xs"
            >
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
            <Button
              size="icon-xs"
              variant="ghost"
              aria-label={`More actions for ${person.name}`}
              onClick={() => setOpened(opened === person.name ? "" : person.name)}
            >
              <IconDots />
            </Button>
            {opened === person.name && (
              <div className="flex basis-full justify-end gap-2">
                <Button size="xs" variant="ghost">
                  View profile
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setRoles({ ...roles, [person.initials.toLowerCase()]: "Removed" })}
                >
                  Remove
                </Button>
              </div>
            )}
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 9)
    return (
      <ItemGroup className="max-w-md gap-2">
        {[
          { id: "slack", icon: <IconBrandSlack />, name: "Slack", description: "Team conversations" },
          { id: "github", icon: <IconBrandGithub />, name: "GitHub", description: "Code and deployments" },
          { id: "cloud", icon: <IconCloud />, name: "Cloud storage", description: "Files and shared folders" },
        ].map((app) => (
          <Item key={app.id} variant="outline" size="sm">
            <ItemMedia variant="icon">{app.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{app.name}</ItemTitle>
              <ItemDescription>{app.description}</ItemDescription>
            </ItemContent>
            {enabled.includes(app.id) ? (
              <Badge variant="secondary">
                <IconCheck />
                Connected
              </Badge>
            ) : (
              <Button size="sm" variant="outline" onClick={() => toggle(enabled, app.id, setEnabled)}>
                <IconPlugConnected />
                Connect
              </Button>
            )}
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 11)
    return (
      <div className="w-full max-w-md">
        <Item variant="card">
          <ItemMedia variant="icon">
            <IconSettings />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Workspace settings</ItemTitle>
            <ItemDescription>Manage access, notifications, and connected services.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline" onClick={() => setOpened(opened ? "" : "Workspace settings")}>
              {opened ? "Opened" : "Manage"}
            </Button>
          </ItemActions>
        </Item>
      </div>
    );
  if (index === 12)
    return (
      <ItemGroup className="max-w-md gap-2">
        {(
          [
            { id: "email", title: "Email digests", description: "A weekly summary of workspace activity." },
            {
              id: "security",
              title: "Security alerts",
              description: "Sign-in and access changes that need attention.",
            },
            { id: "product", title: "Product updates", description: "Occasional news about new features." },
          ] as const
        ).map((item) => (
          <Item key={item.id} variant="card">
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
            <Switch
              checked={preferences[item.id]}
              onCheckedChange={(checked) => setPreferences((current) => ({ ...current, [item.id]: checked }))}
              aria-label={item.title}
            />
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 13)
    return (
      <ItemGroup className="max-w-md gap-2">
        {[
          { id: "laptop", title: "MacBook Pro", description: "Current device · Active now" },
          { id: "desktop", title: "iMac", description: "San Francisco · Last active 3 days ago" },
          { id: "phone", title: "iPhone 15", description: "Mobile device · Last active 1 hour ago" },
        ].map((device) => (
          <Item key={device.id} variant="card">
            <Checkbox
              checked={selectedDevices.includes(device.id)}
              onCheckedChange={(checked) =>
                setSelectedDevices((current) =>
                  checked === true ? [...current, device.id] : current.filter((id) => id !== device.id),
                )
              }
              aria-label={`Select ${device.title}`}
            />
            <ItemContent>
              <ItemTitle>{device.title}</ItemTitle>
              <ItemDescription>{device.description}</ItemDescription>
            </ItemContent>
            {device.id === "laptop" && <Badge variant="success-light">Current</Badge>}
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 14)
    return (
      <ItemGroup layout="grid" columns={3} variant="transparent" className="max-w-4xl">
        {[
          { icon: <IconMail />, title: "Inbox", description: "8 unread messages" },
          { icon: <IconFolder />, title: "Projects", description: "12 active projects" },
          { icon: <IconShield />, title: "Security", description: "All systems protected" },
        ].map((item) => (
          <Item key={item.title} variant="card" className="h-full">
            <ItemMedia variant="icon">{item.icon}</ItemMedia>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
            <IconChevronRight className="size-4 text-muted-foreground" />
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 15)
    return (
      <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
        {(["default", "secondary", "tertiary", "outline"] as const).map((variant) => (
          <section key={variant}>
            <ItemGroupHeader>
              <ItemGroupTitle className="capitalize">{variant}</ItemGroupTitle>
              <ItemGroupDescription>
                Grouped items on a {variant === "outline" ? "outlined" : variant} surface.
              </ItemGroupDescription>
            </ItemGroupHeader>
            <ItemGroup variant={variant} className="gap-1">
              <Item size="sm">
                <ItemContent>
                  <ItemTitle>Workspace</ItemTitle>
                  <ItemDescription>General settings</ItemDescription>
                </ItemContent>
              </Item>
              <Item size="sm">
                <ItemContent>
                  <ItemTitle>Members</ItemTitle>
                  <ItemDescription>Manage access</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </section>
        ))}
      </div>
    );
  if (index === 16)
    return (
      <section className="w-full max-w-lg">
        <ItemGroupHeader>
          <ItemGroupTitle id="item-group-preferences-title">Notification preferences</ItemGroupTitle>
          <ItemGroupDescription id="item-group-preferences-description">
            Choose which updates appear in your workspace.
          </ItemGroupDescription>
        </ItemGroupHeader>
        <ItemGroup
          aria-labelledby="item-group-preferences-title"
          aria-describedby="item-group-preferences-description"
          variant="outline"
          dividers
          className="p-1"
        >
          {[
            { title: "Mentions", description: "When someone mentions you" },
            { title: "Assigned tasks", description: "When a task is assigned to you" },
            { title: "Weekly summary", description: "A digest of workspace activity" },
          ].map((item) => (
            <Item key={item.title}>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
              <Switch defaultChecked aria-label={item.title} />
            </Item>
          ))}
        </ItemGroup>
      </section>
    );
  if (index === 17)
    return (
      <ItemGroup layout="grid" columns={3} className="max-w-4xl">
        {(
          [
            { variant: "card", title: "Default", description: "Raised card surface" },
            { variant: "secondary", title: "Secondary", description: "Muted supporting surface" },
            { variant: "tertiary", title: "Tertiary", description: "Stronger muted surface" },
            { variant: "outline", title: "Outline", description: "Bordered transparent surface" },
            { variant: "transparent", title: "Transparent", description: "No added surface" },
          ] as const
        ).map((item) => (
          <Item key={item.variant} variant={item.variant} className="h-full">
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    );
  if (index === 18)
    return (
      <ItemGroup className="max-w-md">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <IconShield />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Security settings</ItemTitle>
          </ItemContent>
          <IconChevronRight className="size-4 text-muted-foreground" />
        </Item>
      </ItemGroup>
    );
  return (
    <ItemGroup className="max-w-lg gap-1">
      {[
        {
          name: "Priya Nair",
          action: "deployed",
          target: "API v2.8.1",
          time: "12 min ago",
          icon: <IconCloud />,
          tone: "bg-success/10 text-success",
        },
        {
          name: "Daniel Weber",
          action: "merged",
          target: "#482 · Improve workspace search",
          time: "48 min ago",
          icon: <IconCheck />,
          tone: "bg-info/10 text-info",
        },
        {
          name: "Alex Morgan",
          action: "opened",
          target: "Issue #184 · Billing export",
          time: "Yesterday",
          icon: <IconMusic />,
          tone: "bg-warning/10 text-warning",
        },
      ].map((activity, i) => (
        <Item key={activity.target} size="sm" className="items-start">
          <ItemMedia variant="image">
            <Person index={i} size="size-8" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {activity.name}
              <Badge variant="outline" className={activity.tone}>
                {activity.action}
              </Badge>
              <span className="truncate font-normal text-muted-foreground">{activity.target}</span>
            </ItemTitle>
            <ItemDescription>{activity.time}</ItemDescription>
          </ItemContent>
          <Button
            size="icon-xs"
            variant="ghost"
            aria-label={`Open ${activity.target}`}
            onClick={() => setOpened(activity.target)}
          >
            <IconChevronRight />
          </Button>
          {opened === activity.target && (
            <span className="basis-full pl-11 text-xs text-muted-foreground">
              Activity details are ready to review.
            </span>
          )}
        </Item>
      ))}
    </ItemGroup>
  );
}

export function ItemExamples() {
  return (
    <>
      {examples.map((title, index) => (
        <ComponentPreview key={title} title={title}>
          <ItemDemo index={index} />
        </ComponentPreview>
      ))}
    </>
  );
}
