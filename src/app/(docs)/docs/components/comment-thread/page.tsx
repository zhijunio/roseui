import { CommentThreadExamples } from "@/examples/components/comment-thread/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Comment Thread" };

export default function CommentThreadPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Comment Thread" />
      <CommentThreadExamples />
    </div>
  );
}
