"use client";

import { useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import {
  IconArchive,
  IconActivity,
  IconBook2,
  IconBolt,
  IconBell,
  IconChevronLeft,
  IconChevronDown,
  IconChevronRight,
  IconDots,
  IconExternalLink,
  IconHome2,
  IconPencil,
  IconSearch,
  IconSend,
  IconSettings,
  IconShieldCheck,
  IconStar,
  IconStack2,
  IconUsers,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { toast } from "sonner";
import {
  ComponentPreview,
  usePreviewViewport,
} from "@/components/composite/component-preview";
import { TeamSwitcher } from "@/components/composite/team-switcher";
import { currentUser } from "@/data/avatar-data";
import { workspaces } from "@/data/nav";
import { NavUser } from "@/components/composite/nav-user";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Resizable } from "@/components/composite/resizable";
import { useThemeConfig } from "@/components/theme-customizer";
import type { SidebarVariant } from "@/lib/theme-config";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const currentWorkspace = { type: "Free" };

const userMenuItems = [
  { kind: "external", label: "Project source", href: "https://github.com", icon: <IconBrandGithub /> },
] satisfies ComponentProps<typeof NavUser>["items"];

type LayoutMode = "workspace" | "sidebar" | "resizable" | "top-navigation";
type SidebarTogglePosition =
  "navbar-start" | "navbar-end" | "sidebar-header" | "sidebar-footer";
type SidebarCollapseMode =
  "narrow-rail" | "wide-rail" | "floating-rail" | "offcanvas" | "none";
export type SidebarExampleVariant = "workspace" | "inbox" | "docs";
type SidebarScenarioItem = {
  title: string;
  icon: Icon;
  children?: readonly string[];
  badge?: string;
};

const platformItems = [
  { title: "Overview", icon: IconHome2 },
  {
    title: "Pipelines",
    icon: IconBolt,
    children: ["Build Runs", "Deployments", "Release Gates"],
  },
  {
    title: "Infrastructure",
    icon: IconStack2,
    children: ["Compute", "Storage"],
  },
  { title: "Observability", icon: IconActivity, badge: "14" },
  { title: "Security", icon: IconShieldCheck },
];
const resources = [
  { title: "API Gateway", color: "bg-success", tag: "Prod" },
  { title: "ML Pipeline", color: "bg-primary" },
  { title: "Database", color: "bg-info", tag: "US-East" },
  { title: "CDN", color: "bg-warning" },
  { title: "Authentication", color: "bg-destructive" },
];
const footerItems = [
  { title: "Settings", icon: IconSettings },
  { title: "Invite Team", icon: IconUsers },
  { title: "Documentation", icon: IconBook2 },
];
const menuSections = [
  { title: "Platform", items: platformItems.map(({ title }) => title) },
  { title: "Resources", items: resources.map(({ title }) => title) },
];

const sidebarScenarioItems = {
  workspace: [
    { title: "Home", icon: IconHome2 },
    { title: "Projects", icon: IconStack2, children: ["Active", "Archived"] },
    { title: "Team", icon: IconUsers },
    { title: "Activity", icon: IconActivity, badge: "6" },
    { title: "Settings", icon: IconSettings },
  ],
} satisfies Record<"workspace", readonly SidebarScenarioItem[]>;

const inboxMessages = [
  {
    sender: "Emma Carter",
    subject: "Onboarding prototype, round two",
    preview: "The revised flow is ready for another pass.",
    time: "9:42 AM",
    initials: "EC",
    color: "bg-destructive",
    unread: true,
    label: "Design review",
  },
  {
    sender: "Sofia Rossi",
    subject: "Launch checklist: four items left",
    preview: "I marked the release blockers and linked the final screenshots.",
    time: "8:15 AM",
    initials: "AM",
    color: "bg-info",
    unread: true,
    label: "Launch",
  },
  {
    sender: "Marcus Chen",
    subject: "Menu and table states for Thursday",
    preview: "Can we review the interaction states before the handoff?",
    time: "Yesterday",
    initials: "MJ",
    color: "bg-warning",
    unread: true,
    label: "Design review",
  },
  {
    sender: "Priya Nair",
    subject: "Preview build 412 is live",
    preview: "The latest build is ready for QA in the staging workspace.",
    time: "Yesterday",
    initials: "JB",
    color: "bg-primary",
    unread: false,
    label: "Launch",
  },
  {
    sender: "Noah Kim",
    subject: "Interview notes from the Lisbon sessions",
    preview: "Three patterns stood out across the interviews.",
    time: "Mon",
    initials: "NW",
    color: "bg-success",
    unread: false,
    label: "Research",
  },
  {
    sender: "Hannah Kim",
    subject: "Portfolio review for the senior role",
    preview: "Sharing the candidate packet for your review.",
    time: "Mon",
    initials: "SR",
    color: "bg-warning",
    unread: false,
    label: "Hiring",
  },
  {
    sender: "Daniel Weber",
    subject: "Status page copy, final pass",
    preview: "The updated incident language is in the document.",
    time: "Sun",
    initials: "LP",
    color: "bg-info",
    unread: false,
    label: "Research",
  },
] as const;

const docsPages = [
  "Overview",
  "Verify signatures",
  "Retries and backoff",
  "Event types",
] as const;

function WorkspaceSidebar({
  togglePosition,
  collapseMode,
}: {
  togglePosition: SidebarTogglePosition;
  collapseMode: SidebarCollapseMode;
}) {
  const { state, isMobile } = useSidebar();
  const [activeChild, setActiveChild] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    Pipelines: true,
    Resources: true,
  });
  const collapsed = state === "collapsed" && !isMobile;
  const scenarioItems = sidebarScenarioItems.workspace;
  const collapsedMenuButtonClass = collapsed
    ? "mx-auto justify-center p-0!"
    : undefined;
  const toggle = (title: string) =>
    setExpanded((current) => ({ ...current, [title]: !current[title] }));

  return (
    <>
      <SidebarHeader>
        <div className="flex min-h-12 items-center gap-2">
          <div className="min-w-0 flex-1">
            <TeamSwitcher
              workspaces={workspaces}
              onCreateWorkspace={() =>
                toast.info("Workspace creation is ready for this demo.")
              }
            />
          </div>
          {collapseMode !== "none" &&
            togglePosition === "sidebar-header" &&
            !collapsed && <SidebarTrigger className="shrink-0" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu className="group-data-[collapsible=icon]:gap-1">
            {scenarioItems.map((item) => {
              const Icon = item.icon;
              const isOpen = expanded[item.title] ?? false;
              if (!item.children) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={collapsedMenuButtonClass}
                      isActive={activeChild.startsWith(`${item.title}/`)}
                      tooltip={item.title}
                    >
                      <Icon />
                      {!collapsed && <span>{item.title}</span>}
                      {"badge" in item && item.badge && (
                        <SidebarMenuBadge className="bg-primary/10 text-primary">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
              return (
                <Collapsible
                  key={item.title}
                  open={isOpen}
                  onOpenChange={() => toggle(item.title)}
                  asChild
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        type="button"
                        className={collapsedMenuButtonClass}
                        isActive={activeChild.startsWith(`${item.title}/`)}
                        tooltip={item.title}
                      >
                        <Icon />
                        {!collapsed && <span>{item.title}</span>}
                        <IconChevronRight
                          className={`ml-auto size-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden ${isOpen ? "rotate-90" : ""}`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!collapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={
                                  activeChild === `${item.title}/${child}`
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveChild(`${item.title}/${child}`)
                                  }
                                >
                                  {child}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel asChild>
            <button
              type="button"
              onClick={() => toggle("Resources")}
              aria-expanded={expanded.Resources}
              className="w-full justify-between"
            >
              Quick links
              <IconChevronDown
                className={`size-4 transition-transform duration-200 ${expanded.Resources ? "" : "-rotate-90"}`}
              />
            </button>
          </SidebarGroupLabel>
          <Collapsible
            open={expanded.Resources}
            onOpenChange={() => toggle("Resources")}
          >
            <CollapsibleContent>
              <SidebarMenu>
                {resources.map(({ title, color, tag }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      className={collapsedMenuButtonClass}
                      tooltip={title}
                      isActive={activeChild === title}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full ${color}`}
                      />
                      {!collapsed && <span>{title}</span>}
                      {tag && (
                        <SidebarMenuBadge className="bg-primary/10 text-primary">
                          {tag}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {footerItems.map(({ title, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton tooltip={title}>
                  <Icon />
                  {!collapsed && <span>{title}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="mx-0 w-full" />
        <div className="group-data-[collapsible=icon]:[&_[data-sidebar=menu-button]>div]:hidden group-data-[collapsible=icon]:[&_[data-sidebar=menu-button]>svg]:hidden group-data-[collapsible=icon]:[&_[data-sidebar=menu-button]]:justify-center">
          <NavUser user={currentUser} workspaceType={currentWorkspace.type} items={userMenuItems} onSignOut={async () => {}} />
        </div>
        {collapseMode !== "none" &&
          (togglePosition === "sidebar-footer" ||
            (togglePosition === "sidebar-header" && collapsed)) && (
            <div className="flex justify-end border-t pt-2">
              <SidebarTrigger />
            </div>
          )}
      </SidebarFooter>
      {collapseMode !== "none" && <SidebarRail />}
    </>
  );
}

function WorkspaceHeader({
  togglePosition,
  collapseMode,
  showSidebar = true,
}: {
  togglePosition: SidebarTogglePosition;
  collapseMode: SidebarCollapseMode;
  showSidebar?: boolean;
}) {
  const previewViewport = usePreviewViewport();
  const mobilePreview = previewViewport === "mobile";

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      {showSidebar &&
        collapseMode !== "none" &&
        togglePosition === "navbar-start" && (
          <SidebarTrigger className="shrink-0" />
        )}
      <Button
        variant="outline"
        className={cn(
          "h-9 min-w-0 max-w-56 flex-1 justify-start gap-2 px-3 text-muted-foreground",
          mobilePreview ? "hidden" : "hidden sm:flex",
        )}
      >
        <IconSearch className="size-4" />
        <span className="min-w-0 truncate text-sm">Search workspace…</span>
        <kbd className="ml-auto rounded border px-1.5 py-0.5 text-[10px]">
          ⌘ K
        </kbd>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={mobilePreview ? "flex" : "sm:hidden"}
        aria-label="Search workspace"
      >
        <IconSearch />
      </Button>
      <div className="ml-auto flex items-center gap-1.5">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <IconBell />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <IconSettings />
        </Button>
        <span className="mx-1 h-6 w-px bg-border" />
        <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium">
          AM
        </span>
      </div>
      {showSidebar &&
        collapseMode !== "none" &&
        togglePosition === "navbar-end" && (
          <SidebarTrigger className="shrink-0" />
        )}
    </header>
  );
}

function PreviewFrame({
  children,
  togglePosition = "navbar-start",
  collapseMode = "narrow-rail",
  sidebarVariant: sidebarVariantOverride,
  sidebarSide = "left",
  defaultSidebarOpen = true,
  sidebarOpen,
  onSidebarOpenChange,
  showSidebar = true,
  toolbar,
  footer,
}: {
  children: ReactNode;
  togglePosition?: SidebarTogglePosition;
  collapseMode?: SidebarCollapseMode;
  sidebarVariant?: SidebarVariant;
  sidebarSide?: "left" | "right";
  defaultSidebarOpen?: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  showSidebar?: boolean;
  toolbar?: ReactNode;
  footer?: ReactNode;
}) {
  const { config } = useThemeConfig();
  const previewMobile = usePreviewViewport() === "mobile";
  const fixedSidebar = collapseMode === "none" && !previewMobile;
  const sidebarCollapsible = previewMobile
    ? "icon"
    : fixedSidebar
    ? "none"
    : collapseMode === "offcanvas"
      ? "offcanvas"
      : "icon";
  const sidebarVariant =
    sidebarVariantOverride ??
    (collapseMode === "floating-rail" ? "floating" : config.sidebarVariant);
  const paddedSidebar = sidebarVariant !== "sidebar";
  const sidebarIconWidth =
    collapseMode === "floating-rail"
      ? "3rem"
      : collapseMode === "wide-rail"
        ? paddedSidebar
          ? "4.4375rem"
          : "5.5rem"
        : "3rem";
  const sidebarStyle: CSSProperties & {
    "--sidebar-width": string;
    "--sidebar-width-icon": string;
  } = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": sidebarIconWidth,
  };

  return (
    <SidebarProvider
      open={fixedSidebar ? true : previewMobile ? false : sidebarOpen}
      onOpenChange={fixedSidebar ? undefined : onSidebarOpenChange}
      defaultOpen={defaultSidebarOpen}
      cookieName="app-layout-example-sidebar"
      disableShortcut
      style={sidebarStyle}
      className="relative isolate h-[560px] min-h-0 overflow-hidden rounded-lg border"
    >
      {showSidebar && (
        <Sidebar
          side={sidebarSide}
          variant={sidebarVariant}
          collapsible={sidebarCollapsible}
          className={
            fixedSidebar ? "h-full shrink-0" : "!absolute !inset-y-0 !h-full"
          }
        >
          <WorkspaceSidebar
            togglePosition={togglePosition}
            collapseMode={previewMobile ? "narrow-rail" : collapseMode}
          />
        </Sidebar>
      )}
      <SidebarInset className="h-full min-h-0 min-w-0">
        <WorkspaceHeader
          togglePosition={togglePosition}
          collapseMode={collapseMode}
          showSidebar={showSidebar}
        />
        {toolbar && (
          <div className="shrink-0 border-b px-4 py-2">{toolbar}</div>
        )}
        <main
          aria-label="Workspace canvas"
          className="flex min-h-0 min-w-0 flex-1"
        >
          {children}
        </main>
        {footer && (
          <footer className="shrink-0 border-t px-4 py-2">{footer}</footer>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SidebarBehaviorDemo() {
  const [togglePosition, setTogglePosition] =
    useState<SidebarTogglePosition>("navbar-start");
  const [collapseMode, setCollapseMode] =
    useState<SidebarCollapseMode>("offcanvas");
  const [sidebarVariant, setSidebarVariant] =
    useState<SidebarVariant>("floating");
  const [sidebarSide, setSidebarSide] = useState<"left" | "right">("left");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const positions: { value: SidebarTogglePosition; label: string }[] = [
    { value: "navbar-start", label: "Navbar start" },
    { value: "navbar-end", label: "Navbar end" },
    { value: "sidebar-header", label: "Sidebar header" },
    { value: "sidebar-footer", label: "Sidebar footer" },
  ];
  const collapseModes: { value: SidebarCollapseMode; label: string }[] = [
    { value: "none", label: "Fixed" },
    { value: "narrow-rail", label: "Icon rail" },
    { value: "offcanvas", label: "Off canvas" },
  ];

  return (
    <div className="grid w-full gap-3">
      <div
        className="grid gap-1"
        role="group"
        aria-label="Sidebar toggle position"
      >
        <p className="text-xs font-medium text-muted-foreground">
          Toggle position
        </p>
        <div className="flex flex-wrap gap-2">
          {positions.map(({ value, label }) => (
            <Button
              key={value}
              size="sm"
              variant={togglePosition === value ? "secondary" : "ghost"}
              aria-pressed={togglePosition === value}
              disabled={collapseMode === "none"}
              onClick={() => setTogglePosition(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div
        className="grid gap-1"
        role="group"
        aria-label="Sidebar collapse mode"
      >
        <p className="text-xs font-medium text-muted-foreground">
          Collapse mode
        </p>
        <div className="flex flex-wrap gap-2">
          {collapseModes.map(({ value, label }) => (
            <Button
              key={value}
              size="sm"
              variant={collapseMode === value ? "secondary" : "ghost"}
              aria-pressed={collapseMode === value}
              onClick={() => {
                setCollapseMode(value);
                setSidebarOpen(value === "none");
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-1" role="group" aria-label="Sidebar style">
        <p className="text-xs font-medium text-muted-foreground">
          Sidebar style
        </p>
        <div className="flex flex-wrap gap-2">
          {(["inset", "sidebar", "floating"] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={sidebarVariant === value ? "secondary" : "ghost"}
              aria-pressed={sidebarVariant === value}
              onClick={() => setSidebarVariant(value)}
            >
              {value === "inset"
                ? "Inset"
                : value === "sidebar"
                  ? "Sidebar"
                  : "Floating"}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-1" role="group" aria-label="Sidebar side">
        <p className="text-xs font-medium text-muted-foreground">
          Sidebar side
        </p>
        <div className="flex gap-2">
          {(["left", "right"] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={sidebarSide === value ? "secondary" : "ghost"}
              aria-pressed={sidebarSide === value}
              onClick={() => setSidebarSide(value)}
            >
              {value === "left" ? "Left" : "Right"}
            </Button>
          ))}
        </div>
      </div>
      <PreviewFrame
        togglePosition={togglePosition}
        collapseMode={collapseMode}
        sidebarVariant={sidebarVariant}
        sidebarSide={sidebarSide}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      >
        <div className="min-h-0 flex-1 bg-background" />
      </PreviewFrame>
    </div>
  );
}

function WorkspaceShellDemo() {
  return (
    <PreviewFrame collapseMode="floating-rail" defaultSidebarOpen={false}>
      <div className="min-h-0 flex-1 bg-background" />
    </PreviewFrame>
  );
}

function InboxShellContent() {
  const [composing, setComposing] = useState(false);
  const [draggingSubject, setDraggingSubject] = useState("");

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-5">
        <div>
          <h2 className="text-base font-semibold">Inbox</h2>
          <p className="text-[10px] text-muted-foreground">7 unread messages</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setComposing((open) => !open)}
          >
            <IconPencil />
            Compose
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Search inbox">
            <IconSearch />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="More inbox actions"
          >
            <IconDots />
          </Button>
        </div>
      </header>
      {composing && (
        <form
          className="grid gap-2 border-b p-4"
          onSubmit={(event) => {
            event.preventDefault();
            setComposing(false);
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-10 text-[10px] text-muted-foreground">To</span>
            <input
              className="h-8 min-w-0 flex-1 rounded-[var(--radius-control)] border border-input bg-transparent px-2 text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Recipient"
            />
          </div>
          <input
            className="h-8 rounded-[var(--radius-control)] border border-input bg-transparent px-2 text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="Subject"
          />
          <textarea
            className="min-h-16 resize-none rounded-[var(--radius-control)] border border-input bg-transparent p-2 text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="Write a message…"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setComposing(false)}
            >
              Discard
            </Button>
            <Button type="submit" size="sm" className="gap-1.5">
              <IconSend />
              Send
            </Button>
          </div>
        </form>
      )}
      <div className="min-h-0 flex-1 overflow-auto px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium">Recent mail</span>
          <span className="text-[10px] text-muted-foreground">
            Drag messages to a folder
          </span>
        </div>
        <div className="overflow-hidden rounded-md border">
          {inboxMessages.map((message) => (
            <div
              key={message.subject}
              draggable
              onDragStart={() => setDraggingSubject(message.subject)}
              onDragEnd={() => setDraggingSubject("")}
              className={`group flex min-w-0 items-center gap-3 border-b p-3 last:border-b-0 hover:bg-muted/50 ${draggingSubject === message.subject ? "bg-muted opacity-60" : ""}`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-primary-foreground ${message.color}`}
              >
                {message.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`truncate text-xs ${message.unread ? "font-semibold" : "font-medium"}`}
                  >
                    {message.sender}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${message.label === "Design review" ? "bg-primary" : message.label === "Launch" ? "bg-info" : message.label === "Research" ? "bg-success" : "bg-warning"}`}
                  />
                  <span className="truncate text-xs font-medium">
                    {message.subject}
                  </span>
                  <span className="hidden rounded border px-1 py-0.5 text-[9px] text-muted-foreground sm:inline">
                    {message.label}
                  </span>
                  <span className="hidden truncate text-[10px] text-muted-foreground md:inline">
                    {message.preview}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Star ${message.subject}`}
                >
                  <IconStar />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Archive ${message.subject}`}
                >
                  <IconArchive />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Move ${message.subject}`}
                >
                  <IconDots />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {draggingSubject ? `Dragging ${draggingSubject}` : ""}
      </p>
    </div>
  );
}

function DocsShellContent() {
  const [selectedPage, setSelectedPage] =
    useState<(typeof docsPages)[number]>("Verify signatures");
  const pageIndex = docsPages.indexOf(selectedPage);
  const nextPage = docsPages[(pageIndex + 1) % docsPages.length];

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b px-5">
        <span className="text-xs text-muted-foreground">Halden docs</span>
        <IconChevronRight className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-medium">Webhooks</span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search documentation"
          >
            <IconSearch />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Copy page link">
            <IconExternalLink />
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto flex max-w-3xl gap-8 p-6 sm:p-8">
          <article className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>Webhooks</span>
              <IconChevronRight className="size-3" />
              <span>{selectedPage}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight">
              {selectedPage}
            </h2>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Every webhook request is signed, so you can confirm it came from
              Halden and wasn&apos;t changed on the way.
            </p>
            <div className="mt-4 flex items-center gap-2 border-b pb-4">
              <span className="grid size-7 place-items-center rounded-full bg-muted text-[10px] font-semibold">
                AM
              </span>
              <div className="text-[10px]">
                <p className="font-medium">Sofia Rossi</p>
                <p className="text-muted-foreground">Updated Sep 18, 2026</p>
              </div>
              <Button variant="outline" size="xs" className="ml-auto gap-1.5">
                <IconExternalLink />
                Copy link
              </Button>
            </div>
            <section className="mt-6">
              <h3 className="text-sm font-semibold">How signing works</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Each request carries a{" "}
                <code className="rounded border bg-muted px-1 py-0.5 text-[10px]">
                  Halden-Signature
                </code>{" "}
                header with a timestamp and an HMAC-SHA256 signature.
              </p>
              <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-[10px] leading-5">
                <code>{`t=1758451200,v1=5257a869e7ecebeda32affa62cdcd3fa51cad7e77a0e56ff536d0ce8e108d8bd`}</code>
              </pre>
            </section>
            <section className="mt-6">
              <h3 className="text-sm font-semibold">
                Find your signing secret
              </h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Each endpoint has its own secret that starts with{" "}
                <code className="rounded border bg-muted px-1 py-0.5 text-[10px]">
                  whsec_
                </code>
                . Find it in the endpoint details.
              </p>
            </section>
            <section className="mt-6">
              <h3 className="text-sm font-semibold">Verify with the SDK</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Pass the raw body, not parsed JSON. Parsing and serializing
                again changes the whitespace.
              </p>
              <pre className="mt-3 overflow-auto rounded-md border bg-muted p-3 text-[10px] leading-5">
                <code>{`const event = halden.webhooks.verify(rawBody, signature, secret)`}</code>
              </pre>
            </section>
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  setSelectedPage(docsPages[Math.max(0, pageIndex - 1)])
                }
              >
                <IconChevronLeft />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPage(nextPage)}
              >
                Next: {nextPage}
              </Button>
            </div>
          </article>
          <aside className="hidden w-36 shrink-0 lg:block">
            <p className="text-[10px] font-semibold text-muted-foreground">
              ON THIS PAGE
            </p>
            <nav className="mt-3 grid gap-2 border-l pl-3 text-[10px]">
              <button
                type="button"
                className="text-left font-medium text-foreground"
              >
                How signing works
              </button>
              <button type="button" className="text-left text-muted-foreground">
                Find your signing secret
              </button>
              <button type="button" className="text-left text-muted-foreground">
                Verify with the SDK
              </button>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function SidebarExample({
  variant,
}: {
  variant: SidebarExampleVariant;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(variant !== "inbox");
  if (variant === "inbox")
    return (
      <div className="relative isolate h-[560px] min-h-0 overflow-hidden rounded-lg border">
        <InboxShellContent />
      </div>
    );
  if (variant === "docs")
    return (
      <div className="relative isolate h-[560px] min-h-0 overflow-hidden rounded-lg border">
        <DocsShellContent />
      </div>
    );

  const configuration = {
    workspace: {
      collapseMode: "narrow-rail" as const,
      sidebarSide: "left" as const,
    },
    inbox: {
      collapseMode: "floating-rail" as const,
      sidebarSide: "left" as const,
    },
    docs: {
      collapseMode: "narrow-rail" as const,
      sidebarSide: "right" as const,
    },
  }[variant];

  return (
    <PreviewFrame
      collapseMode={configuration.collapseMode}
      sidebarSide={configuration.sidebarSide}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    >
      <div className="grid min-h-0 flex-1 place-items-center bg-muted/20 p-6 text-center">
        <div className="max-w-xs space-y-2">
          <p className="text-sm font-medium">Workspace projects</p>
          <p className="text-xs text-muted-foreground">
            Use the navigation to switch between workspace areas.
          </p>
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ResizableWorkspaceDemo() {
  return (
    <div className="grid w-full gap-3">
      <PreviewFrame
        collapseMode="narrow-rail"
        toolbar={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>All projects</span>
            <span className="ml-auto">Updated just now</span>
          </div>
        }
        footer={
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>12 projects</span>
            <span>Synced just now</span>
          </div>
        }
      >
        <Resizable
          className="h-full min-h-0 flex-1 rounded-none border-0"
          initialSize={62}
          minSize={45}
          maxSize={78}
          handleType="line"
          first={<div className="h-full min-w-0 flex-1 bg-background" />}
          second={
            <aside
              aria-label="Workspace activity"
              className="h-full min-w-0 overflow-auto border-l bg-background p-3 sm:p-4"
            >
              <h2 className="text-sm font-medium">Activity</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Recent workspace updates
              </p>
              <ul className="mt-4 grid gap-4 text-xs">
                <li>
                  <span className="font-medium">Priya Nair</span> updated the
                  roadmap{" "}
                  <span className="block text-muted-foreground">
                    12 min ago
                  </span>
                </li>
                <li>
                  <span className="font-medium">Daniel Weber</span> joined the
                  workspace{" "}
                  <span className="block text-muted-foreground">
                    1 hour ago
                  </span>
                </li>
                <li>
                  <span className="font-medium">Olivia Patel</span> shared a
                  document{" "}
                  <span className="block text-muted-foreground">Yesterday</span>
                </li>
              </ul>
            </aside>
          }
        />
      </PreviewFrame>
    </div>
  );
}

function TopNavigationDemo() {
  const [activePage, setActivePage] = useState("Overview");
  const [primaryWorkspace] = workspaces;

  if (!primaryWorkspace) return null;

  return (
    <div className="relative isolate h-[560px] min-h-0 overflow-hidden rounded-lg border">
      <header className="sticky top-0 z-20 flex h-16 min-w-0 items-center gap-3 overflow-hidden border-b bg-background px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="shrink-0 gap-2 px-1.5">
              <primaryWorkspace.icon className="size-5 text-primary" />
              <span className="text-sm font-medium">{primaryWorkspace.name}</span>
              <IconChevronDown className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>RoseUI · Enterprise</DropdownMenuItem>
            <DropdownMenuItem>Vertex Labs · Startup</DropdownMenuItem>
            <DropdownMenuItem>Northwind · Free</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
        >
          {menuSections.map((section) => (
            <DropdownMenu key={section.title}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 shrink-0 gap-1.5 px-2 sm:px-3"
                >
                  <span className="truncate">{section.title}</span>
                  <IconChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel>{section.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {section.items.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onSelect={() => setActivePage(item)}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
        <Button variant="outline" size="icon-sm" aria-label="Search workspace">
          <IconSearch />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <IconBell />
        </Button>
        <div className="[&_[data-sidebar=menu-button]]:h-8 [&_[data-sidebar=menu-button]]:w-8 [&_[data-sidebar=menu-button]]:justify-center [&_[data-sidebar=menu-button]>div]:hidden [&_[data-sidebar=menu-button]>svg]:hidden">
          <NavUser user={currentUser} workspaceType={currentWorkspace.type} items={userMenuItems} onSignOut={async () => {}} />
        </div>
      </header>
      <main aria-label="Workspace canvas" className="flex min-h-0 flex-1">
        <div className="sr-only" aria-live="polite">
          Current page: {activePage}
        </div>
      </main>
    </div>
  );
}

const previews: Record<LayoutMode, { title: string; previewId: string; children: ReactNode }> = {
  workspace: { title: "Workspace Shell", previewId: "app-layout-workspace-01", children: <WorkspaceShellDemo /> },
  sidebar: { title: "Sidebar Behavior", previewId: "app-layout-workspace-sidebar-behavior-01", children: <SidebarBehaviorDemo /> },
  resizable: {
    title: "Resizable Workspace",
    previewId: "app-layout-resizable-01",
    children: <ResizableWorkspaceDemo />,
  },
  "top-navigation": {
    title: "Top Navigation",
    previewId: "app-layout-top-navigation-01",
    children: <TopNavigationDemo />,
  },
};

export function AppLayoutExamples({ mode }: { mode: LayoutMode }) {
  const preview = previews[mode];
  return (
    <ComponentPreview title={preview.title} layout="fullStack" previewId={preview.previewId}>
      {preview.children}
    </ComponentPreview>
  );
}

export function WorkspaceExamples() {
  return <AppLayoutExamples mode="workspace" />;
}
