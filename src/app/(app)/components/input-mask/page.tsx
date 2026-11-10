import { PageHeader } from "@/components/page-header";
import { InputMaskExamples } from "@/app/(app)/components/input-mask/examples";

export const metadata = { title: "Input Mask" };

export default function InputMaskPage() {
  return <div className="space-y-6"><PageHeader title="Input Mask" description="Guide structured input while preserving familiar text fields." /><InputMaskExamples /></div>;
}
