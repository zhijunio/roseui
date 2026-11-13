import { DrawerExamples } from "@/components/examples/drawer/drawer";

export const metadata = { title: "Drawer" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <DrawerExamples />
    </div>
  );
}
