import { AppLayout } from "@/components/docs/app-layout";

export default function ComponentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AppLayout>{children}</AppLayout>;
}
