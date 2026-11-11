import { AppLayout } from "@/components/site/app-layout";

export default function BlocksLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppLayout>{children}</AppLayout>;
}
