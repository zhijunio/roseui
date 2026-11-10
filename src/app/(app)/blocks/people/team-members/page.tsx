import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { TeamMembersExample } from "./examples";

export const metadata: Metadata = { title: "Team Members", description: "Manage workspace members, roles, and invitations." };

export default function TeamMembersPage() {
  return <div className="space-y-6"><PageHeader title="Team Members" description="Invite teammates, manage roles, and keep workspace seats under control." /><ComponentPreview previewId="people-team-members-01" title="Workspace members" layout="fullStack"><TeamMembersExample /></ComponentPreview></div>;
}
