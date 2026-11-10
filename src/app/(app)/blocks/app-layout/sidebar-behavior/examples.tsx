"use client";

import { ComponentPreview } from "@/components/composite/component-preview";
import { SidebarBehaviorDemo } from "../workspace/examples";

export function SidebarExamples() {
  return (
    <ComponentPreview previewId="app-layout-sidebar-behavior-01" title="Sidebar Behavior" layout="fullStack">
      <SidebarBehaviorDemo />
    </ComponentPreview>
  );
}
