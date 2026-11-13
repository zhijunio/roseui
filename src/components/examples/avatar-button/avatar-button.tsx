"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { AvatarButton, type AvatarButtonProps } from "@/components/ui/avatar-button";
import { getUserAvatar } from "@/data/user";

const variants = ["default", "secondary", "outline", "ghost"] satisfies NonNullable<AvatarButtonProps["variant"]>[];
const sizes = ["xs", "sm", "default", "lg"] satisfies NonNullable<AvatarButtonProps["avatarSize"]>[];

const members = [
  { id: "alex", label: "Alex Morgan", fallback: "AM", src: getUserAvatar("Alex Morgan") },
  { id: "sofia", label: "Sofia Rossi", fallback: "SR", src: getUserAvatar("Sofia Rossi") },
  { id: "jordan", label: "Jordan Lee", fallback: "JL", src: getUserAvatar("Jordan Lee") },
] as const;

function MemberSelectionExample() {
  const [selected, setSelected] = useState<(typeof members)[number]>(members[0]);

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {members.map((member) => (
          <AvatarButton
            key={member.id}
            label={member.label}
            src={member.src}
            fallback={member.fallback}
            variant={selected.id === member.id ? "secondary" : "outline"}
            onPress={() => setSelected(member)}
          />
        ))}
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        Selected member: {selected.label}
      </p>
    </div>
  );
}

export function AvatarButtonExamples() {
  return (
    <>
      <ComponentPreview title="Selectable Avatars" layout="panel">
        <MemberSelectionExample />
      </ComponentPreview>
      <ComponentPreview title="Variants" layout="panel">
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <AvatarButton
              key={variant}
              label="Alex Morgan"
              src={getUserAvatar("Alex Morgan")}
              fallback="AM"
              variant={variant}
            />
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Avatar sizes" layout="panel">
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((avatarSize) => (
            <AvatarButton
              key={avatarSize}
              label={avatarSize}
              src={getUserAvatar("Alex Morgan")}
              fallback="AM"
              avatarSize={avatarSize}
            />
          ))}
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled" layout="panel">
        <AvatarButton label="Unavailable member" src={getUserAvatar("Hannah Kim")} fallback="HK" isDisabled />
      </ComponentPreview>
    </>
  );
}
