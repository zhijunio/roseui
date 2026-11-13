import { LockScreenExample } from "@/examples/blocks/auth/lock-screen/lock-screen";
import { PageHeader } from "@/examples/page-header";

export default function LockPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lock Screen" />
      <LockScreenExample />
    </div>
  );
}
