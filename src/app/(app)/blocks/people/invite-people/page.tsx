import type { Metadata } from "next";

import { InvitePeopleExample } from "@/examples/blocks/people/invite-people/invite-people";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Invite People",
  description: "Invite workspace teammates with roles and batch email entry.",
};

export default function InvitePeoplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invite People" />
      <ComponentPreview title="Workspace invitations" layout="fullStack">
        <InvitePeopleExample />
      </ComponentPreview>
    </div>
  );
}
