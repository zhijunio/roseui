import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { InvitePeopleExample } from "./examples";

export const metadata: Metadata = { title: "Invite People", description: "Invite workspace teammates with roles and batch email entry." };

export default function InvitePeoplePage() {
  return <div className="space-y-6"><PageHeader title="Invite People" description="Add teammates in batches, assign roles, and send workspace invitations." /><ComponentPreview previewId="people-invite-people-01" title="Workspace invitations" layout="fullStack"><InvitePeopleExample /></ComponentPreview></div>;
}
