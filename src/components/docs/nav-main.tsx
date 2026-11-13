"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import { Blocks as BlocksIcon, ChevronRight, type LucideIcon, PanelsTopLeft } from "lucide-react";

import { Menu, MenuHeader, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu";
import {
  SidebarDisclosure,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarItem,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "@/components/ui/sidebar";
import type { NavItem, NavSection } from "@/data/nav";
import { cn } from "@/lib/utils";

interface NavMainProps {
  sections: readonly NavSection[];
  searchQuery?: string;
}

type SidebarNavSection = NavSection & { icon: LucideIcon };

const SECTION_ORDER = ["Blocks", "Components"] as const;

export function NavMain({ sections, searchQuery = "" }: NavMainProps) {
  const pathname = usePathname();
  const { setIsOpenOnMobile, setOpen } = useSidebar();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const sidebarSections = getSidebarSections(sections);
  const filteredSections = filterSections(sidebarSections, normalizedQuery);
  const activeSectionLabel = sidebarSections.find((section) =>
    section.items.some((item) => itemHasActiveRoute(item, pathname)),
  )?.label;
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({ Blocks: true });

  return (
    <SidebarSectionGroup className="gap-y-0">
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
          onOpenChange={(open) => setOpenSections((current) => ({ ...current, [section.label]: open }))}
          onNavigate={() => {
            setIsOpenOnMobile(false);
            setOpen(true);
          }}
        />
      ))}
      {normalizedQuery && filteredSections.length === 0 ? (
        <p className="text-muted-foreground px-4 py-6 text-center text-xs group-data-[collapsible=dock]:hidden">
          No matches found
        </p>
      ) : null}
    </SidebarSectionGroup>
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
  const isCurrent = section.items.some((item) => itemHasActiveRoute(item, pathname));

  if (state === "collapsed" && !isMobile) {
    return (
      <SidebarSectionGroup className="p-1">
        <MenuTrigger>
          <button
            type="button"
            data-current={isCurrent ? "true" : undefined}
            className={cn(
              "hover:bg-sidebar-accent focus-visible:ring-sidebar-ring mx-auto grid size-8 place-items-center rounded-md p-2 outline-none focus-visible:ring-2",
              isCurrent && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary",
            )}
            aria-label={section.label}
            title={section.label}
          >
            <SectionIcon className="text-muted-foreground size-4" aria-hidden="true" />
          </button>

          <Menu placement="right top" className="w-60">
            {section.items.map((item, index) => (
              <React.Fragment key={item.title}>
                {index > 0 ? <MenuSeparator /> : null}
                <MenuHeader className="flex items-center gap-2">
                  {item.icon ? <item.icon className="size-4" aria-hidden="true" /> : null}
                  {item.title}
                </MenuHeader>
                {item.url ? (
                  <MenuItem href={item.url} onAction={onNavigate}>
                    {item.title}
                  </MenuItem>
                ) : null}
                {item.items?.map((child) => (
                  <MenuItem
                    key={child.url}
                    href={child.url}
                    onAction={onNavigate}
                    className={isPathActive(child.url, pathname) ? "bg-accent" : undefined}
                  >
                    {child.title}
                  </MenuItem>
                ))}
              </React.Fragment>
            ))}
          </Menu>
        </MenuTrigger>
      </SidebarSectionGroup>
    );
  }

  return (
    <SidebarDisclosure isExpanded={open} onExpandedChange={onOpenChange} className="px-0">
      <SidebarDisclosureTrigger
        data-current={isCurrent ? "true" : undefined}
        className={cn(
          "group/nav-section h-10 gap-2 px-2 text-sm font-semibold group-data-[collapsible=dock]:mx-auto group-data-[collapsible=dock]:justify-center [&>[data-slot=chevron]]:hidden",
        )}
      >
        <SectionIcon className="text-muted-foreground size-4" aria-hidden="true" />
        <span className="group-data-[collapsible=dock]:hidden">{section.label}</span>
        <span className="text-muted-foreground ml-auto text-xs font-normal tabular-nums group-data-[collapsible=dock]:hidden">
          {countItems(section.items)}
        </span>
        <ChevronRight
          aria-hidden="true"
          className="text-muted-foreground ml-0 !size-3.5 transition-transform duration-200 ease-in-out group-aria-expanded/nav-section:rotate-90 group-data-[collapsible=dock]:hidden"
        />
      </SidebarDisclosureTrigger>
      <SidebarDisclosurePanel className="overflow-hidden group-data-[collapsible=dock]:hidden data-[state=closed]:hidden">
        <SidebarSection className="gap-0 p-0">
          {section.items.map((item) => (
            <NavMainItemRow
              key={item.title}
              item={item}
              pathname={pathname}
              forceOpen={forceOpen}
              onNavigate={onNavigate}
            />
          ))}
        </SidebarSection>
      </SidebarDisclosurePanel>
    </SidebarDisclosure>
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
    const isCurrent = itemHasActiveRoute(item, pathname);
    const open = forceOpen || (manuallyOpen ?? isCurrent);

    return (
      <SidebarDisclosure isExpanded={open} onExpandedChange={setManuallyOpen} className="px-0">
        <SidebarDisclosureTrigger
          data-current={isCurrent ? "true" : undefined}
          className={cn(
            "group/nav-item h-8 gap-2 px-2 py-1 text-sm font-medium [&>[data-slot=chevron]]:hidden",
            isCurrent && "font-semibold text-primary **:data-[slot=chevron]:text-primary **:[svg]:text-primary",
          )}
        >
          <ChevronRight
            aria-hidden="true"
            className="text-muted-foreground !size-3 transition-transform duration-200 ease-in-out group-aria-expanded/nav-item:rotate-90"
          />
          <span>{item.title}</span>
          <span className="bg-sidebar-accent text-muted-foreground ml-auto grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs leading-none font-medium tabular-nums">
            {item.items.length}
          </span>
        </SidebarDisclosureTrigger>
        <SidebarDisclosurePanel className="overflow-hidden data-[state=closed]:hidden">
          <div className="border-sidebar-border col-span-full mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5">
            {item.items.map((child) => (
              <SidebarItem
                key={child.url}
                href={child.url}
                isCurrent={isPathActive(child.url, pathname)}
                onPress={onNavigate}
                className="grid-cols-1 gap-2 rounded-md px-2 py-1 text-sm"
              >
                <span className="truncate">{child.title}</span>
              </SidebarItem>
            ))}
          </div>
        </SidebarDisclosurePanel>
      </SidebarDisclosure>
    );
  }

  if (!item.url) return null;

  return (
    <SidebarItem
      href={item.url}
      isCurrent={isPathActive(item.url, pathname)}
      onPress={onNavigate}
      tooltip={item.title}
      className="grid-cols-1 gap-2 py-1.5 group-data-[collapsible=dock]:mx-auto group-data-[collapsible=dock]:justify-center"
    >
      <span className="group-data-[collapsible=dock]:hidden">{item.title}</span>
    </SidebarItem>
  );
}

function getSidebarSections(sections: readonly NavSection[]): readonly SidebarNavSection[] {
  return SECTION_ORDER.flatMap((label) => {
    const section = sections.find((candidate) => candidate.label === label);
    if (!section) return [];

    return [{ ...section, icon: label === "Blocks" ? BlocksIcon : PanelsTopLeft }];
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
