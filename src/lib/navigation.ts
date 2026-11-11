import type { NavSection } from "@/data/nav";
import { NAV_DATA } from "@/data/nav";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const normalizedPathname = normalizePathname(pathname);
  const navigationBreadcrumbs = findNavigationBreadcrumbs(normalizedPathname);

  if (navigationBreadcrumbs) return navigationBreadcrumbs;

  const segments = normalizedPathname.split("/").filter(Boolean);
  return formatSegments(segments).map((label, index) => ({
    label,
    ...(index < segments.length - 1 ? { href: `/${segments.slice(0, index + 1).join("/")}` } : {}),
  }));
}

function findNavigationBreadcrumbs(pathname: string): BreadcrumbItem[] | undefined {
  const sections: readonly NavSection[] = NAV_DATA;

  for (const section of sections) {
    for (const item of section.items) {
      if (item.url && normalizePathname(item.url) === pathname) {
        return [{ label: section.label }, { label: item.title }];
      }

      const child = item.items?.find((subItem) => normalizePathname(subItem.url) === pathname);
      if (!child) continue;

      return [
        { label: section.label },
        { label: item.title, ...(item.url ? { href: normalizePathname(item.url) } : {}) },
        { label: child.title },
      ];
    }
  }

  return undefined;
}

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

function formatSegments(segments: string[]): string[] {
  const acronyms: Record<string, string> = {
    api: "API",
    crm: "CRM",
    faq: "FAQ",
    hr: "HR",
    otp: "OTP",
  };

  return segments.map((segment) => {
    const decodedSegment = decodeSegment(segment);
    return (
      acronyms[decodedSegment] ??
      decodedSegment.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase())
    );
  });
}

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
