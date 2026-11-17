import { AvatarButtonExamples } from "@/components/examples/avatar-button/avatar-button";

export const metadata = { title: "Avatar Button" };

export default function AvatarButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <AvatarButtonExamples />
    </div>
  );
}
