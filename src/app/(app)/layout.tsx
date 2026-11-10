import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { AppShell } from "@/components/app-shell";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider delayDuration={0}>
      <AppShell>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <AppHeader />
          <main className="app-main min-w-0 flex-1 p-3 md:p-4">{children}</main>
        </SidebarInset>
        <ThemeCustomizer />
      </AppShell>
    </TooltipProvider>
  );
}
