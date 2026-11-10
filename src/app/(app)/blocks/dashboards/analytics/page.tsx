import type { Metadata } from "next";

import { AnalyticsDashboard } from "./analytics-dashboard";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
