"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  IconChartBar,
  IconChevronRight,
  IconCloverFilled,
  IconComponents,
  IconFile,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import {
  ComponentPreview,
  usePreviewViewport,
} from "@/components/composite/component-preview";
import { TeamSwitcher } from "@/components/composite/team-switcher";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type Page = { title: string; icon?: typeof IconFile };
type Subgroup = { title: string; pages: Page[] };
type NavigationGroup = {
  title: string;
  icon: typeof IconChartBar;
  pages?: Page[];
  subgroups?: Subgroup[];
};
type Structure = "groups" | "label-groups";
type IconPlacement = "groups" | "all" | "none";
type CollapseMode = "fixed" | "icon" | "offcanvas";

const navigationGroups: NavigationGroup[] = [
  {
    title: "Analytics",
    icon: IconChartBar,
    pages: [
      { title: "Overview" },
      { title: "Metrics dashboard" },
      { title: "Revenue explorer" },
    ],
  },
  {
    title: "People",
    icon: IconUsers,
    subgroups: [
      {
        title: "Team",
        pages: [{ title: "Directory" }, { title: "Invitations" }],
      },
      {
        title: "Access",
        pages: [{ title: "Roles" }, { title: "Permissions" }],
      },
    ],
  },
  {
    title: "Components",
    icon: IconComponents,
    subgroups: [
      {
        title: "Buttons",
        pages: [
          { title: "Button" },
          { title: "Split button" },
          { title: "Action button" },
        ],
      },
      {
        title: "Inputs",
        pages: [
          { title: "Input" },
          { title: "Textarea" },
          { title: "Search field" },
        ],
      },
    ],
  },
  {
    title: "Settings",
    icon: IconSettings,
    pages: [{ title: "Workspace settings" }, { title: "Billing" }],
  },
];

function countPages(group: NavigationGroup) {
  return (
    group.pages?.length ??
    group.subgroups?.reduce(
      (total, subgroup) => total + subgroup.pages.length,
      0,
    ) ??
    0
  );
}

function filterGroups(groups: NavigationGroup[], query: string) {
  if (!query) return groups;
  return groups.flatMap((group) => {
    const groupMatches = group.title.toLowerCase().includes(query);
    const pages = group.pages?.filter((page) =>
      page.title.toLowerCase().includes(query),
    );
    const subgroups = group.subgroups
      ?.map((subgroup) => ({
        ...subgroup,
        pages: subgroup.pages.filter((page) =>
          page.title.toLowerCase().includes(query),
        ),
      }))
      .filter(
        (subgroup) =>
          subgroup.title.toLowerCase().includes(query) || subgroup.pages.length,
      );

    if (!groupMatches && !pages?.length && !subgroups?.length) return [];
    return [{ ...group, pages: groupMatches ? group.pages : pages, subgroups }];
  });
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="grid h-6 min-w-6 place-items-center rounded-full bg-sidebar-accent px-1 text-[11px] font-medium leading-none tabular-nums text-muted-foreground">
      {count}
    </span>
  );
}

function NavigationSidebar({
  structure,
  iconPlacement,
  query,
  onQueryChange,
}: {
  structure: Structure;
  iconPlacement: IconPlacement;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const groups = filterGroups(navigationGroups, query);
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    Analytics: true,
    People: true,
    Components: true,
    Settings: true,
  });
  const [openSubgroups, setOpenSubgroups] = React.useState<
    Record<string, boolean>
  >({ "Components/Buttons": true });
  const showGroupIcons = iconPlacement !== "none";
  const showPageIcons = iconPlacement === "all";

  return (
    <>
      <SidebarHeader>
        <TeamSwitcher
          workspaces={[
            { name: "RoseUI", plan: "Enterprise", icon: IconCloverFilled },
            { name: "Vertex Labs", plan: "Startup", icon: IconComponents },
            { name: "Northwind", plan: "Free", icon: IconFile },
          ]}
          onCreateWorkspace={() =>
            toast.info("Workspace creation is ready for this demo.")
          }
        />
        {!collapsed && (
          <div className="relative px-1 pt-2">
            <IconSearch
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <SidebarInput
              value={query}
              onChange={(event) =>
                onQueryChange(event.target.value.toLowerCase())
              }
              placeholder="Search menu"
              className="h-9 bg-sidebar-accent/45 pl-9"
              aria-label="Search menu"
            />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {structure === "label-groups" && (
          <SidebarGroup className="p-1 pb-0">
            <SidebarGroupLabel>Blocks</SidebarGroupLabel>
          </SidebarGroup>
        )}
        {groups.map((group) => {
          const groupOpen = Boolean(query) || Boolean(openGroups[group.title]);
          const GroupIcon = group.icon;
          if (collapsed) {
            return (
              <SidebarGroup key={group.title} className="p-1">
                <SidebarMenuButton
                  tooltip={group.title}
                  aria-label={group.title}
                  className="mx-auto size-8 justify-center p-0"
                >
                  <GroupIcon className="text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarGroup>
            );
          }
          return (
            <SidebarGroup key={group.title} className="p-1">
              <Collapsible
                className="group/collapsible"
                open={groupOpen}
                onOpenChange={(open) =>
                  setOpenGroups((current) => ({
                    ...current,
                    [group.title]: open,
                  }))
                }
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-9 font-medium">
                    {showGroupIcons && (
                      <GroupIcon className="text-muted-foreground" />
                    )}
                    <span>{group.title}</span>
                    <span className="ml-auto">
                      <CountBadge count={countPages(group)} />
                    </span>
                    <IconChevronRight className="!size-3.5 text-muted-foreground transition-transform data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden">
                  {group.pages && (
                    <PageList
                      pages={group.pages}
                      showPageIcons={showPageIcons}
                    />
                  )}
                  {group.subgroups?.map((subgroup) => {
                    const key = `${group.title}/${subgroup.title}`;
                    const subgroupOpen =
                      Boolean(query) || Boolean(openSubgroups[key]);
                    return (
                      <Collapsible
                        className="group/collapsible"
                        key={key}
                        open={subgroupOpen}
                        onOpenChange={(open) =>
                          setOpenSubgroups((current) => ({
                            ...current,
                            [key]: open,
                          }))
                        }
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="h-8 pl-2 text-sm font-medium">
                            <IconChevronRight className="!size-3 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            <span>{subgroup.title}</span>
                            <span className="ml-auto">
                              <CountBadge count={subgroup.pages.length} />
                            </span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden">
                          <PageList
                            pages={subgroup.pages}
                            showPageIcons={showPageIcons}
                            nested
                          />
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          );
        })}
        {!groups.length && (
          <p className="px-4 py-6 text-center text-xs text-muted-foreground">
            No menu items found
          </p>
        )}
      </SidebarContent>
    </>
  );
}

function PageList({
  pages,
  showPageIcons,
  nested = false,
}: {
  pages: Page[];
  showPageIcons: boolean;
  nested?: boolean;
}) {
  return (
    <SidebarMenuSub className={nested ? "ml-8" : ""}>
      {pages.map((page) => (
        <SidebarMenuSubItem key={page.title}>
          <SidebarMenuSubButton asChild>
            <button type="button" className="text-left">
              {showPageIcons && <IconFile />}
              {page.title}
            </button>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}

export function SidebarNavigationExample() {
  const [structure, setStructure] =
    React.useState<Structure>("label-groups");
  const [iconPlacement, setIconPlacement] =
    React.useState<IconPlacement>("groups");
  const [collapseMode, setCollapseMode] = React.useState<CollapseMode>("fixed");
  const [query, setQuery] = React.useState("");
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const previewMobile = usePreviewViewport() === "mobile";
  const effectiveCollapseMode = previewMobile ? "icon" : collapseMode;

  return (
    <ComponentPreview previewId="app-layout-sidebar-navigation-01" title="Navigation patterns" layout="fullStack">
      <div className="grid gap-3">
        <div
          className="grid gap-1"
          role="group"
          aria-label="Navigation structure"
        >
          <p className="text-xs font-medium text-muted-foreground">Navigation structure</p>
          <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={structure === "groups" ? "secondary" : "ghost"}
            aria-pressed={structure === "groups"}
            onClick={() => setStructure("groups")}
          >
            Groups
          </Button>
          <Button
            size="sm"
            variant={structure === "label-groups" ? "secondary" : "ghost"}
            aria-pressed={structure === "label-groups"}
            onClick={() => setStructure("label-groups")}
          >
            Label + groups
          </Button>
          </div>
        </div>
        <div
          className="grid gap-1"
          role="group"
          aria-label="Icon placement"
        >
          <p className="text-xs font-medium text-muted-foreground">Icon placement</p>
          <div className="flex flex-wrap gap-2">
          {(["groups", "all", "none"] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={iconPlacement === value ? "secondary" : "ghost"}
              aria-pressed={iconPlacement === value}
              onClick={() => setIconPlacement(value)}
            >
              {value === "groups"
                ? "Group icons"
                : value === "all"
                  ? "All icons"
                  : "No icons"}
            </Button>
          ))}
          </div>
        </div>
        <div
          className="grid gap-1"
          role="group"
          aria-label="Collapse mode"
        >
          <p className="text-xs font-medium text-muted-foreground">Collapse mode</p>
          <div className="flex flex-wrap gap-2">
          {(["fixed", "icon", "offcanvas"] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={collapseMode === value ? "secondary" : "ghost"}
              aria-pressed={collapseMode === value}
              onClick={() => {
                setCollapseMode(value);
                setSidebarOpen(value === "fixed");
              }}
            >
              {value === "fixed"
                ? "Fixed"
                : value === "icon"
                  ? "Icon rail"
                  : "Off canvas"}
            </Button>
          ))}
          </div>
        </div>
        <SidebarProvider
          open={previewMobile ? false : sidebarOpen}
          onOpenChange={setSidebarOpen}
          defaultOpen
          className="relative isolate h-[520px] min-h-0 overflow-hidden rounded-lg border"
          cookieName="sidebar-navigation-example"
          disableShortcut
        >
          <Sidebar
            collapsible={
              effectiveCollapseMode === "fixed"
                ? "none"
                : effectiveCollapseMode === "icon"
                  ? "icon"
                  : "offcanvas"
            }
            className={
              effectiveCollapseMode === "fixed"
                ? "h-full shrink-0"
                : "!absolute !inset-y-0 !h-full"
            }
          >
            <NavigationSidebar
              structure={structure}
              iconPlacement={iconPlacement}
              query={query}
              onQueryChange={setQuery}
            />
          </Sidebar>
          <SidebarInset className="h-full min-h-0">
            <header className="flex h-12 items-center gap-2 border-b px-4">
              {effectiveCollapseMode !== "fixed" && <SidebarTrigger />}
              <span className="text-sm font-medium">Content area</span>
            </header>
            <main className="flex-1 bg-muted/20" />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ComponentPreview>
  );
}
