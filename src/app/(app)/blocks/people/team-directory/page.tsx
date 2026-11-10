import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { TeamDirectoryExample } from "./examples";

export const metadata: Metadata = { title: "Team Directory", description: "Browse and search people in a workspace." };

export default function TeamDirectoryPage() {
  return <div className="space-y-6"><PageHeader title="Team Directory" description="Search the workspace, filter by team, and open a focused people profile." /><ComponentPreview previewId="people-team-directory-01" title="Workspace directory" layout="fullStack"><TeamDirectoryExample /></ComponentPreview></div>;
}
