import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { TeamShowcaseExample } from "./examples";

export const metadata: Metadata = { title: "Team Showcase", description: "Introduce a team with responsive profile layouts." };

export default function TeamShowcasePage() {
  return <div className="space-y-6"><PageHeader title="Team Showcase" description="Introduce people with gallery, filmstrip, directory, and spotlight layouts." /><ComponentPreview previewId="people-team-showcase-01" title="Meet the team" layout="fullStack"><TeamShowcaseExample /></ComponentPreview></div>;
}
