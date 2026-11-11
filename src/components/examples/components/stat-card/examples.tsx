import { StatCard } from "@/components/ui/stat-card";

const overviewStats = [
  { label: "Total Revenue", value: "$284,392", change: 12.5, trend: "up" as const, hint: "vs. last month" },
  { label: "New Customers", value: "2,318", change: 8.2, trend: "up" as const, hint: "vs. last month" },
  { label: "Active Accounts", value: "18,472", change: 3.1, trend: "up" as const, hint: "vs. last month" },
  { label: "Churn Rate", value: "1.8%", change: 0.4, trend: "down" as const, hint: "vs. last month" },
];

export function StatCardExamples() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {overviewStats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          change={`${stat.change}%`}
          trend={stat.trend}
          hint={stat.hint}
        />
      ))}
    </div>
  );
}
