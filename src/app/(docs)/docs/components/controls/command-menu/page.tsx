import { CommandMenuExamples } from "@/components/examples/command-menu/command-menu";

export const metadata = { title: "Command Menu" };

export default function CommandMenuPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CommandMenuExamples />
      </div>
    </div>
  );
}
