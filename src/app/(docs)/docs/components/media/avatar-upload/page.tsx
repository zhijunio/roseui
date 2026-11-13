import { AvatarUploadExamples } from "@/components/examples/avatar-upload/avatar-upload";
export const metadata = { title: "Avatar Upload" };
export default function Page() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AvatarUploadExamples />
      </div>
    </div>
  );
}
