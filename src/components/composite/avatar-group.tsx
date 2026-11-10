"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (
      React.isValidElement<{ children?: React.ReactNode }>(child) &&
      child.type === React.Fragment
    ) {
      return flattenChildren(child.props.children);
    }
    return [child];
  });
}

function AvatarGroup({
  className,
  children,
  max,
  layout = "stack",
  overlap = "ring",
  role = "group",
  ...props
}: React.ComponentProps<"div"> & {
  max?: number;
  layout?: "stack" | "grid";
  overlap?: "ring" | "none";
}) {
  const childArray = flattenChildren(children);
  const countChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === AvatarGroupCount,
  );
  const avatarChildren = countChild
    ? childArray.filter((child) => child !== countChild)
    : childArray;
  const visibleLimit =
    max === undefined ? avatarChildren.length : Math.max(0, Math.floor(max));
  const visibleChildren = avatarChildren.slice(0, visibleLimit);
  const overflowCount = Math.max(0, avatarChildren.length - visibleLimit);

  return (
    <div
      data-slot="avatar-group"
      data-layout={layout}
      data-overlap={overlap}
      role={role}
      className={cn(
        "group/avatar-group flex",
        overlap === "ring" &&
          "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        layout === "stack" && "-space-x-2",
        layout === "grid" && "flex-wrap gap-2",
        className,
      )}
      {...props}
    >
      {visibleChildren}
      {countChild ??
        (overflowCount > 0 ? (
          <AvatarGroupCount aria-hidden="true">
            +{overflowCount}
          </AvatarGroupCount>
        ) : null)}
    </div>
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className,
      )}
      {...props}
    />
  );
}

export { AvatarGroup, AvatarGroupCount };
