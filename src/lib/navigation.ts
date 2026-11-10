import { navGroups, type NavGroup, type NavItem } from "@/data/nav";

type NavigationMatch = {
  group: NavGroup;
  parent?: NavItem;
  item: NavItem | { title: string; url: string };
  url: string;
};

export function routeMatches(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function findNavigationMatch(pathname: string): NavigationMatch | undefined {
  const matches: NavigationMatch[] = [];

  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.url && routeMatches(pathname, item.url)) {
        matches.push({ group, item, url: item.url });
      }

      for (const child of item.items ?? []) {
        if (routeMatches(pathname, child.url)) {
          matches.push({ group, parent: item, item: child, url: child.url });
        }
      }
    }
  }

  return matches.sort((a, b) => b.url.length - a.url.length)[0];
}

export function getBreadcrumbLabels(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const match = findNavigationMatch(pathname);

  if (!match) return formatSegments(segments);

  const matchedSegments = match.url.split("/").filter(Boolean).length;
  const labels = match.parent
    ? pathname === match.url
      ? [match.parent.title, match.item.title]
      : [match.parent.title]
    : [match.item.title];

  return [...labels, ...formatSegments(segments.slice(matchedSegments))];
}

function formatSegments(segments: string[]) {
  const acronyms: Record<string, string> = { hr: "HR", crm: "CRM", api: "API", otp: "OTP", faq: "FAQ" };
  return segments.map((segment) => acronyms[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()));
}
