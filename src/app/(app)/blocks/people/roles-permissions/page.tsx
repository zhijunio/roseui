import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { RolesPermissionsExample } from "./examples";

export const metadata: Metadata = { title: "Roles and Permissions", description: "Review role access and save permission changes." };

export default function RolesPermissionsPage() {
  return <div className="space-y-6"><PageHeader title="Roles and Permissions" description="Set clear access boundaries for every workspace role." /><ComponentPreview previewId="people-roles-permissions-01" title="Permission policy" layout="fullStack"><RolesPermissionsExample /></ComponentPreview></div>;
}
