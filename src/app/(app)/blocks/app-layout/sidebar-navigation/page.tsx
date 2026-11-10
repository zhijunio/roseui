import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SidebarNavigationExample } from "./examples";

export const metadata: Metadata = {
  title: "Sidebar Navigation",
  description:
    "Compare sidebar navigation hierarchy, icons, search, and count badges.",
};

export default function SidebarNavigationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sidebar Navigation"
        description="Explore navigation levels, icon placement, search, and page count badges."
      />
      <SidebarNavigationExample />
    </div>
  );
}
