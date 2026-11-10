import { demoAvatarUrl } from "@/lib/utils";

export const people = [
  { id: "alex", name: "Alex Morgan", avatar: demoAvatarUrl("Alex Morgan") },
  { id: "sofia", name: "Sofia Rossi", avatar: demoAvatarUrl("Sofia Rossi") },
  { id: "marcus", name: "Marcus Chen", avatar: demoAvatarUrl("Marcus Chen") },
  { id: "priya", name: "Priya Nair", avatar: demoAvatarUrl("Priya Nair") },
  { id: "daniel", name: "Daniel Weber", avatar: demoAvatarUrl("Daniel Weber") },
  { id: "hannah", name: "Hannah Kim", avatar: demoAvatarUrl("Hannah Kim") },
  { id: "emma", name: "Emma Carter", avatar: demoAvatarUrl("Emma Carter") },
  { id: "liam", name: "Liam Nguyen", avatar: demoAvatarUrl("Liam Nguyen") },
  { id: "olivia", name: "Olivia Patel", avatar: demoAvatarUrl("Olivia Patel") },
  { id: "noah", name: "Noah Kim", avatar: demoAvatarUrl("Noah Kim") },
] as const;

export type Person = (typeof people)[number];

export function getPersonByName(name: string): Person | undefined {
  return people.find((person) => person.name === name);
}

export function getPersonAvatar(name: string): string {
  return getPersonByName(name)?.avatar ?? demoAvatarUrl(name);
}

export const currentUser = {
  ...people[0],
  email: "alex.morgan@roseui.com",
  role: "Administrator",
};
