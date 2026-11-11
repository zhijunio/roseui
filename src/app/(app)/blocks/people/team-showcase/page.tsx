import type { Metadata } from "next";

import { TeamShowcaseExample } from "@/components/examples/blocks/people/team-showcase/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Team Showcase",
  description: "Introduce a team with responsive profile layouts.",
};

export default function TeamShowcasePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Showcase"
        description="Introduce people with gallery, filmstrip, directory, and spotlight layouts."
      />
      <ComponentPreview title="Meet the team" layout="fullStack">
        <TeamShowcaseExample />
      </ComponentPreview>
    </div>
  );
}
