import { LockScreenExample } from "@/components/examples/blocks/auth/lock-screen/examples";
import { PageHeader } from "@/components/examples/page-header";

export default function LockPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lock Screen" description="Resume a session with a focused unlock flow." />
      <LockScreenExample />
    </div>
  );
}
