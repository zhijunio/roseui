import type { Metadata } from "next";

import { TeamShowcaseExample } from "@/examples/blocks/people/team-showcase/team-showcase";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Team Showcase",
  description: "Introduce a team with responsive profile layouts.",
};

export default function TeamShowcasePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Team Showcase" />
      <ComponentPreview title="Meet the team" layout="fullStack">
        <TeamShowcaseExample />
      </ComponentPreview>
    </div>
  );
}
