import type { Metadata } from "next";

import { TeamMembersExample } from "@/examples/blocks/people/team-members/team-members";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage workspace members, roles, and invitations.",
};

export default function TeamMembersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Team Members" />
      <ComponentPreview title="Workspace members" layout="fullStack">
        <TeamMembersExample />
      </ComponentPreview>
    </div>
  );
}
