import { AvatarUploadExamples } from "@/examples/components/avatar-upload/examples";
import { PageHeader } from "@/examples/page-header";
export const metadata = { title: "Avatar Upload" };
export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Avatar Upload" />
      <AvatarUploadExamples />
    </div>
  );
}
