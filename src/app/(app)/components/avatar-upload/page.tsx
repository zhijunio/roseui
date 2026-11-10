import { PageHeader } from "@/components/page-header";
import { AvatarUploadExamples } from "@/app/(app)/components/avatar-upload/examples";
export const metadata = { title: "Avatar Upload" };
export default function Page() { return <div className="space-y-6"><PageHeader title="Avatar Upload" description="Choose and update a workspace profile image." /><AvatarUploadExamples /></div>; }
