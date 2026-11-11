import { AvatarUploadExamples } from "@/components/examples/components/avatar-upload/examples";
import { PageHeader } from "@/components/examples/page-header";
export const metadata = { title: "Avatar Upload" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Avatar Upload" description="Choose and update a workspace profile image." />
      <AvatarUploadExamples />
    </div>
  );
}
