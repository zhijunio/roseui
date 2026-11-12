"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Blocks as BlocksIcon, ChevronRight, type LucideIcon, PanelsTopLeft } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { NavItem, NavSection } from "@/data/nav";

interface NavMainProps {
  sections: readonly NavSection[];
  searchQuery?: string;
}

type SidebarNavSection = NavSection & {
  icon: LucideIcon;
};

const SECTION_ORDER = ["Blocks", "Components"] as const;

export function NavMain({ sections, searchQuery = "" }: NavMainProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const sidebarSections = getSidebarSections(sections);
  const filteredSections = filterSections(sidebarSections, normalizedQuery);
  const activeSectionLabel = sidebarSections.find((section) =>
    section.items.some((item) => itemHasActiveRoute(item, pathname)),
  )?.label;
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({ Blocks: true });

  return (
    <>
      {filteredSections.map((section) => (
        <NavMainSection
          key={section.label}
          section={section}
          pathname={pathname}
          forceOpen={Boolean(normalizedQuery)}
          open={
            Boolean(normalizedQuery) ||
            (Object.hasOwn(openSections, section.label)
              ? Boolean(openSections[section.label])
              : activeSectionLabel === section.label)
          }
          onOpenChange={(open) =>
            setOpenSections((current) => ({
              ...current,
              [section.label]: open,
            }))
          }
          onNavigate={() => setOpenMobile(false)}
        />
      ))}
      {normalizedQuery && filteredSections.length === 0 ? (
        <p className="text-muted-foreground px-4 py-6 text-center text-xs group-data-[collapsible=icon]:hidden">
          No matches found
        </p>
      ) : null}
    </>
  );
}

function NavMainSection({
  section,
  pathname,
  forceOpen,
  open,
  onOpenChange,
  onNavigate,
}: {
  section: SidebarNavSection;
  pathname: string;
  forceOpen: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: () => void;
}) {
  const SectionIcon = section.icon;
  const { isMobile, state } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return (
      <SidebarGroup className="p-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="mx-auto size-8 justify-center p-2"
              aria-label={section.label}
              title={section.label}
            >
              <SectionIcon className="text-muted-foreground" aria-hidden="true" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-60">
            {section.items.map((item, index) => (
              <React.Fragment key={item.title}>
                {index > 0 ? <DropdownMenuSeparator /> : null}
                <DropdownMenuLabel className="flex items-center gap-2">
                  {item.icon ? <item.icon className="size-4" aria-hidden="true" /> : null}
                  {item.title}
                </DropdownMenuLabel>
                {item.url ? (
                  <DropdownMenuItem asChild>
                    <Link href={item.url} onClick={onNavigate}>
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                {item.items?.map((child) => (
                  <DropdownMenuItem key={child.url} asChild>
                    <Link
                      href={child.url}
                      onClick={onNavigate}
                      className={isPathActive(child.url, pathname) ? "bg-accent" : undefined}
                    >
                      {child.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarGroup>
    );
  }

  return (
    <Collapsible asChild open={open} onOpenChange={onOpenChange} className="group/nav-section">
      <SidebarGroup className="p-1">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={section.label}
            className="h-10 text-sm font-medium group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
          >
            <SectionIcon className="text-muted-foreground" aria-hidden="true" />
            <span className="group-data-[collapsible=icon]:hidden">{section.label}</span>
            <span className="text-muted-foreground ml-auto text-xs font-normal tabular-nums group-data-[collapsible=icon]:hidden">
              {countItems(section.items)}
            </span>
            <ChevronRight className="text-muted-foreground ml-0 !size-3.5 transition-transform duration-200 ease-in-out group-data-[collapsible=icon]:hidden group-data-[state=open]/nav-section:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden group-data-[collapsible=icon]:hidden data-[state=closed]:hidden">
          <SidebarMenu>
            {section.items.map((item) => (
              <NavMainItemRow
                key={item.title}
                item={item}
                pathname={pathname}
                forceOpen={forceOpen}
                onNavigate={onNavigate}
              />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function NavMainItemRow({
  item,
  pathname,
  forceOpen,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  forceOpen: boolean;
  onNavigate: () => void;
}) {
  const [manuallyOpen, setManuallyOpen] = React.useState<boolean | null>(null);

  if (item.items && item.items.length > 0) {
    const isActive = itemHasActiveRoute(item, pathname);
    const open = forceOpen || (manuallyOpen ?? isActive);

    return (
      <Collapsible asChild open={open} onOpenChange={setManuallyOpen} className="group/nav-item">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton isActive={isActive} tooltip={item.title}>
              <ChevronRight className="text-muted-foreground !size-3 transition-transform duration-200 ease-in-out group-data-[state=open]/nav-item:rotate-90" />
              <span>{item.title}</span>
              <span className="bg-sidebar-accent text-muted-foreground ml-auto grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs leading-none font-medium tabular-nums">
                {item.items.length}
              </span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:hidden">
            <SidebarMenuSub>
              {item.items.map((child) => (
                <SidebarMenuSubItem key={child.url}>
                  <SidebarMenuSubButton asChild isActive={isPathActive(child.url, pathname)}>
                    <Link href={child.url} onClick={onNavigate}>
                      <span>{child.title}</span>
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

  if (!item.url) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isPathActive(item.url, pathname)} tooltip={item.title}>
        <Link href={item.url} onClick={onNavigate}>
          <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function getSidebarSections(sections: readonly NavSection[]): readonly SidebarNavSection[] {
  return SECTION_ORDER.flatMap((label) => {
    const section = sections.find((candidate) => candidate.label === label);
    if (!section) return [];

    return [
      {
        ...section,
        icon: label === "Blocks" ? BlocksIcon : PanelsTopLeft,
      },
    ];
  });
}

function filterSections(sections: readonly SidebarNavSection[], query: string): readonly SidebarNavSection[] {
  if (!query) return sections;

  return sections.flatMap((section) => {
    if (matchesQuery(section.label, query)) return [section];

    const items = section.items.map((item) => filterItem(item, query)).filter((item): item is NavItem => item !== null);

    return items.length > 0 ? [{ ...section, items }] : [];
  });
}

function filterItem(item: NavItem, query: string): NavItem | null {
  if (matchesQuery(item.title, query)) return item;

  const items = item.items?.filter((child) => matchesQuery(child.title, query));
  return items?.length ? { ...item, items } : null;
}

function matchesQuery(value: string, query: string) {
  return value.toLowerCase().includes(query);
}

function countItems(items: readonly NavItem[]) {
  return items.reduce((total, item) => total + (item.items?.length ?? 1), 0);
}

function itemHasActiveRoute(item: NavItem, pathname: string) {
  return (
    (item.url ? isPathActive(item.url, pathname) : false) ||
    (item.items?.some((child) => isPathActive(child.url, pathname)) ?? false)
  );
}

function isPathActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
