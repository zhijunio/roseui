import { LeaderboardExamples } from "@/components/examples/leaderboard/leaderboard";

export const metadata = { title: "Leaderboard" };

export default function LeaderboardPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <LeaderboardExamples />
    </div>
  );
}
