import { PageHeader } from "@/components/page-header";
import { SignInExamples } from "./examples";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sign In" description="Explore sign-in patterns for password, passkey, email link, and alternate methods." />
      <SignInExamples />
    </div>
  );
}
