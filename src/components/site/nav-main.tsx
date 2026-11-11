"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
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
}

export function NavMain({ sections }: NavMainProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.label} className="p-3">
          <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => (
              <NavMainItemRow
                key={item.title}
                item={item}
                pathname={pathname}
                onNavigate={() => setOpenMobile(false)}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavMainItemRow({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  if (item.items && item.items.length > 0) {
    const isActive =
      (item.url ? isPathActive(item.url, pathname) : false) ||
      item.items.some((child) => isPathActive(child.url, pathname));

    return (
      <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.title}
              className="group-data-[collapsible=icon]:size-16! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-2xl group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:data-[active=true]:bg-[#f5f6f7] group-data-[collapsible=icon]:[&_svg]:size-6"
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
      <SidebarMenuButton
        asChild
        isActive={isPathActive(item.url, pathname)}
        tooltip={item.title}
        className="group-data-[collapsible=icon]:size-16! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-2xl group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:data-[active=true]:bg-[#f5f6f7] group-data-[collapsible=icon]:[&_svg]:size-6"
      >
        <Link href={item.url} onClick={onNavigate}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function isPathActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
