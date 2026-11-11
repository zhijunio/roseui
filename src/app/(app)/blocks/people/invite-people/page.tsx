import type { Metadata } from "next";

import { InvitePeopleExample } from "@/components/examples/blocks/people/invite-people/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Invite People",
  description: "Invite workspace teammates with roles and batch email entry.",
};

export default function InvitePeoplePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Invite People"
        description="Add teammates in batches, assign roles, and send workspace invitations."
      />
      <ComponentPreview title="Workspace invitations" layout="fullStack">
        <InvitePeopleExample />
      </ComponentPreview>
    </div>
  );
}
