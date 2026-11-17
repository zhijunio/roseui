import { SocialButtonExamples } from "@/components/examples/social-button/social-button";

export const metadata = { title: "Social Button" };

export default function SocialButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <SocialButtonExamples />
    </div>
  );
}
