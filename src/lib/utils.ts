import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const demoAvatarSlugs = new Set([
  "alex-morgan",
  "sofia-rossi",
  "marcus-chen",
  "priya-nair",
  "daniel-weber",
  "hannah-kim",
  "emma-carter",
  "liam-nguyen",
  "olivia-patel",
  "noah-kim",
  "livia-saris",
  "john-doe",
  "jamie-chen",
  "riley-park",
  "sam-chen",
  "jordan-lee",
  "morgan-blake",
  "user",
]);

export function demoAvatarUrl(seed: string | number): string {
  const slug = String(seed)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `/avatars/${demoAvatarSlugs.has(slug) ? slug : "user"}.svg`;
}

export function getInitials(name: string, uppercase = false): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return uppercase ? initials.toUpperCase() : initials;
}
