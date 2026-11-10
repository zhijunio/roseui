"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconBrandGithub,
  IconChevronRight,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import {
  navGroups,
  workspaces,
  type NavChild,
  type NavGroup,
  type NavItem,
} from "@/data/nav";
import { currentUser } from "@/data/avatar-data";
import { routeMatches } from "@/lib/navigation";
import { TeamSwitcher } from "@/components/composite/team-switcher";
import { NavUser } from "@/components/composite/nav-user";
import { useThemeConfig } from "@/components/theme-customizer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const currentWorkspace = { type: "Free" };

const userMenuItems = [
  {
    kind: "external",
    label: "Project source",
    href: "https://github.com/zhijunio/roseui",
    icon: <IconBrandGithub />,
  },
] satisfies React.ComponentProps<typeof NavUser>["items"];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { config } = useThemeConfig();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () => ({ Blocks: true }),
  );
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredGroups = React.useMemo(
    () => filterNavGroups(navGroups, normalizedQuery),
    [normalizedQuery],
  );
  const activeGroupLabel = React.useMemo(
    () =>
      navGroups.find((group) =>
        group.items.some((item) => itemHasActiveRoute(item, pathname)),
      )?.label,
    [pathname],
  );

  return (
    <Sidebar
      collapsible={config.sidebarCollapsible}
      variant={config.sidebarVariant}
    >
      <SidebarHeader>
        <TeamSwitcher
          workspaces={workspaces}
          onCreateWorkspace={() =>
            toast.info("Workspace creation is available from workspace settings.")
          }
        />
        <div className="relative px-1 pt-2 group-data-[collapsible=icon]:hidden">
          <div className="relative h-9">
            <IconSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            />
            <SidebarInput
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchQuery("");
                  event.currentTarget.blur();
                }
              }}
              placeholder="Search menu"
              aria-label="Search menu"
              className="h-9 bg-sidebar-accent/45 pl-8.5 pr-12"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear menu search"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              >
                <IconX className="size-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overscroll-contain">
        {filteredGroups.map((group) => (
          <Collapsible
            key={group.label}
            asChild
            open={
              Boolean(normalizedQuery) ||
              (Object.prototype.hasOwnProperty.call(openGroups, group.label)
                ? Boolean(openGroups[group.label])
                : activeGroupLabel === group.label)
            }
            onOpenChange={(open) =>
              setOpenGroups((current) => ({
                ...current,
                [group.label]: open,
              }))
            }
            className="group/group"
          >
            <SidebarGroup className="p-1">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={group.label}
                  className="h-10 text-sm font-medium"
                >
                  <group.icon
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {group.label}
                  </span>
                  <span className="ml-auto text-xs font-normal tabular-nums text-muted-foreground group-data-[collapsible=icon]:hidden">
                    {countNavItems(group.items)}
                  </span>
                  <IconChevronRight className="ml-0 !size-3.5 text-muted-foreground transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] group-data-[state=open]/group:rotate-90 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden group-data-[collapsible=icon]:hidden [--tw-animation-duration:260ms] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:!animate-none">
                <SidebarMenu>
                  {group.items.map((item) => (
                    <NavEntry
                      key={item.title}
                      item={item}
                      pathname={pathname}
                      forceOpen={Boolean(normalizedQuery)}
                    />
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        {normalizedQuery && filteredGroups.length === 0 && (
          <p className="px-4 py-6 text-center text-xs text-muted-foreground">
            No menu items found
          </p>
        )}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-sidebar-border/70 bg-sidebar px-3 py-3">
        <NavUser
          user={currentUser}
          workspaceType={currentWorkspace.type}
          items={userMenuItems}
          onSignOut={async () => {
            toast.success("Signed out", { description: "Your session has ended." });
            router.push("/blocks/auth/sign-in");
          }}
        />
      </SidebarFooter>
      {config.sidebarCollapsible !== "none" && <SidebarRail />}
    </Sidebar>
  );
}

function matchesQuery(value: string, query: string) {
  return !query || value.toLowerCase().includes(query);
}

function countNavItems(items: (NavItem | NavChild)[]): number {
  return items.reduce(
    (total, item) =>
      total + (item.items?.length ? countNavItems(item.items) : 1),
    0,
  );
}

function itemHasActiveRoute(item: NavItem | NavChild, pathname: string): boolean {
  if (item.url && routeMatches(pathname, item.url)) return true;
  return item.items?.some((child) => itemHasActiveRoute(child, pathname)) ?? false;
}

function filterNavChild(child: NavChild, query: string): NavChild | null {
  const matchingItems = child.items
    ?.map((item) => filterNavChild(item, query))
    .filter((item): item is NavChild => item !== null);
  const matches = matchesQuery(child.title, query);

  if (!matches && !matchingItems?.length) return null;
  return matchingItems ? { ...child, items: matchingItems } : child;
}

function filterNavGroups(groups: NavGroup[], query: string) {
  if (!query) return groups;

  return groups
    .map((group) => {
      if (matchesQuery(group.label, query)) return group;

      const items = group.items
        .map((item) => {
          const filteredItems = item.items
            ?.map((child) => filterNavChild(child, query))
            .filter((child): child is NavChild => child !== null);
          const matches = matchesQuery(item.title, query);

          if (!matches && !filteredItems?.length) return null;
          return filteredItems ? { ...item, items: filteredItems } : item;
        })
        .filter((item): item is NavItem => item !== null);

      return items.length ? { ...group, items } : null;
    })
    .filter((group): group is NavGroup => group !== null);
}

function NavEntry({
  item,
  pathname,
  forceOpen = false,
}: {
  item: NavItem;
  pathname: string;
  forceOpen?: boolean;
}) {
  const { setOpenMobile } = useSidebar();
  const closeMobile = () => setOpenMobile(false);
  const childActive = item.items?.some((child) =>
    routeMatches(pathname, child.url),
  ) ?? false;
  const [manuallyOpen, setManuallyOpen] = React.useState<boolean | null>(null);
  const open = forceOpen || (manuallyOpen ?? childActive);

  // Collapsible parent with children.
  if (item.items?.length) {
    return (
      <Collapsible
        asChild
        open={open}
        onOpenChange={setManuallyOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} isActive={childActive}>
              <IconChevronRight className="!size-3 text-muted-foreground transition-transform duration-[var(--duration-standard)] ease-[var(--ease-standard)] group-data-[state=open]/collapsible:rotate-90" />
              <span>{item.title}</span>
              <span className="ml-auto grid h-6 min-w-6 place-items-center rounded-full bg-sidebar-accent px-1 text-[11px] font-medium leading-none tabular-nums text-muted-foreground">
                {countNavItems(item.items)}
              </span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden [--tw-animation-duration:260ms] data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:!animate-none">
            <SidebarMenuSub>
              {item.items.map((sub) => (
                <SidebarMenuSubItem key={sub.title}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={routeMatches(pathname, sub.url)}
                  >
                    <Link href={sub.url} onClick={closeMobile}>
                      {sub.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Flat link item.
  const active = !!item.url && routeMatches(pathname, item.url);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
        <Link href={item.url ?? "#"} onClick={closeMobile}>
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
