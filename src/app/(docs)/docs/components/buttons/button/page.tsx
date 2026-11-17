import { ButtonExamples } from "@/components/examples/button/button";

export const metadata = { title: "Button" };

export default function ButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ButtonExamples />
    </div>
  );
}
