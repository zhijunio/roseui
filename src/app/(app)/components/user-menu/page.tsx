import { PageHeader } from "@/components/page-header";
import { UserMenuExamples } from "@/app/(app)/components/user-menu/examples";

export const metadata = { title: "User Menu" };

export default function UserMenuPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Menu"
        description="Keep account links, appearance, and sign out together in one menu."
      />
      <UserMenuExamples />
    </div>
  );
}
