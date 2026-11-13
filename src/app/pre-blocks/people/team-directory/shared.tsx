"use client";

import { useState } from "react";

import { IconCopy } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { type Person, personAvatar } from "./data";

export function PersonAvatar({
  person,
  size = "sm",
}: {
  person: Person;
  size?: "xs" | "sm" | "default" | "lg" | "xl";
}) {
  return (
    <Avatar size={size}>
      <AvatarImage src={personAvatar(person.name)} alt="" />
      <AvatarFallback>{person.initials}</AvatarFallback>
    </Avatar>
  );
}

export function statusVariant(status: Person["status"]): "success-light" | "warning-light" | "secondary" {
  if (status === "Available") return "success-light";
  if (status === "In a meeting" || status === "Away") return "warning-light";
  return "secondary";
}

export function CopyEmail({ email, name }: { email: string; name: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <Button type="button" size="sm" variant="outline" onClick={() => void copy()}>
      <IconCopy aria-hidden="true" />
      {copied ? "Copied" : `Copy ${name.split(" ")[0]}'s email`}
    </Button>
  );
}
