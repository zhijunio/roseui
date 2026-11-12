import type { Metadata } from "next";

import { RolesPermissionsExample } from "@/examples/blocks/people/roles-permissions/roles-permissions";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Roles and Permissions",
  description: "Review role access and save permission changes.",
};

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Roles and Permissions" />
      <ComponentPreview title="Permission policy" layout="fullStack">
        <RolesPermissionsExample />
      </ComponentPreview>
    </div>
  );
}
