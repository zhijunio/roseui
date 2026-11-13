import { TeamSwitcherExamples } from "@/components/examples/team-switcher/team-switcher";

export const metadata = { title: "Team Switcher" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <TeamSwitcherExamples />
    </div>
  );
}
