import { IconActivity, IconArrowRight, IconCurrencyDollar } from "@tabler/icons-react"
import { ComponentPreview } from "@/components/composite/component-preview"
import { TrendChip } from "@/components/ui/trend-chip"

export function TrendChipExamples() {
  return <>
    <ComponentPreview previewId="trend-chip-01" title="Direction" exampleLabels={["Up", "Down", "Neutral"]}>
      <TrendChip trend="up" value="+3.3%" />
      <TrendChip trend="down" value="−2.1%" />
      <TrendChip trend="neutral" value="0.0%" />
    </ComponentPreview>
    <ComponentPreview previewId="trend-chip-02" title="Prefix and Suffix" exampleLabels={["Currency prefix", "Time context"]}>
      <TrendChip trend="up" prefix={<IconCurrencyDollar aria-hidden="true" />} value="12.8%" suffix="this month" />
      <TrendChip trend="down" value="4.2%" suffix="vs. last week" />
    </ComponentPreview>
    <ComponentPreview previewId="trend-chip-03" title="Sizes" exampleLabels={["Small", "Medium", "Large"]}>
      <TrendChip trend="up" value="12.8%" size="sm" />
      <TrendChip trend="up" value="12.8%" size="md" />
      <TrendChip trend="up" value="12.8%" size="lg" />
    </ComponentPreview>
    <ComponentPreview previewId="trend-chip-04" title="Variants" exampleLabels={["Primary", "Secondary", "Tertiary", "Soft"]}>
      <TrendChip trend="up" value="8.4%" variant="primary" />
      <TrendChip trend="down" value="2.1%" variant="secondary" />
      <TrendChip trend="neutral" value="0.0%" variant="tertiary" />
      <TrendChip trend="up" value="4.7%" variant="soft" />
    </ComponentPreview>
    <ComponentPreview previewId="trend-chip-05" title="Custom Indicator and Numeric Alignment" exampleLabels={["Custom icon", "Tabular values"]}>
      <TrendChip trend="up" value="View" indicator={<IconArrowRight aria-hidden="true" />} />
      <TrendChip trend="up" prefix="+$" value="1,284.50" suffix={<IconActivity aria-hidden="true" />} />
    </ComponentPreview>
  </>
}
