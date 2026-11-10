import { PageHeader } from "@/components/page-header"
import { TreemapExample } from "@/app/(app)/components/treemap-chart/examples"

export const metadata = { title: "Treemap" }

export default function TreemapExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Treemap" description="Compare category size and inspect the parts within a group." />
      <TreemapExample />
    </div>
  )
}

