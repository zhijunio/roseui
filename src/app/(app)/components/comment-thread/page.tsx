import { CommentThreadExamples } from "@/components/examples/components/comment-thread/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Comment Thread" };

export default function CommentThreadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Comment Thread"
        description="Review records with replies, mentions, reactions, and resolution state."
      />
      <CommentThreadExamples />
    </div>
  );
}
