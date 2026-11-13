import { getUserAvatar } from "@/data/user";

export const people = [
  {
    id: "alex",
    name: "Alex Morgan",
    role: "Product designer",
    team: "Design",
    location: "Lisbon, Portugal",
    timezone: "WET (UTC+0)",
    email: "alex.morgan@roseui.com",
    status: "Available",
    initials: "AM",
  },
  {
    id: "sofia",
    name: "Sofia Rossi",
    role: "Engineering lead",
    team: "Engineering",
    location: "Austin, United States",
    timezone: "CT (UTC-6)",
    email: "sofia.rossi@roseui.com",
    status: "In a meeting",
    initials: "SR",
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "Operations manager",
    team: "Operations",
    location: "Singapore",
    timezone: "SGT (UTC+8)",
    email: "marcus.chen@roseui.com",
    status: "Available",
    initials: "MC",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Research lead",
    team: "Design",
    location: "Warsaw, Poland",
    timezone: "CET (UTC+1)",
    email: "priya.nair@roseui.com",
    status: "Away",
    initials: "PN",
  },
  {
    id: "daniel",
    name: "Daniel Weber",
    role: "Staff engineer",
    team: "Engineering",
    location: "London, United Kingdom",
    timezone: "GMT (UTC+0)",
    email: "daniel.weber@roseui.com",
    status: "Available",
    initials: "DW",
  },
  {
    id: "hannah",
    name: "Hannah Kim",
    role: "People partner",
    team: "Operations",
    location: "New York, United States",
    timezone: "ET (UTC-5)",
    email: "hannah.kim@roseui.com",
    status: "Offline",
    initials: "HK",
  },
] as const;

export type Person = (typeof people)[number];
export function personAvatar(name: string) {
  return getUserAvatar(name);
}
export const teamNames = ["All people", "Design", "Engineering", "Operations"] as const;
