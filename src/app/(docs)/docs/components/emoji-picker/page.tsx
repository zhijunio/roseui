import { EmojiPickerExamples } from "@/examples/components/emoji-picker/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Emoji Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Emoji Picker" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <EmojiPickerExamples />
      </div>
    </div>
  );
}
