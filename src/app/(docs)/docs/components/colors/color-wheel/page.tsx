import { ColorWheelExamples } from "@/components/examples/color-wheel/color-wheel";

export const metadata = { title: "Color Wheel" };

export default function ColorWheelPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ColorWheelExamples />
    </div>
  );
}
