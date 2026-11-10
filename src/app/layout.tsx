import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeConfigProvider } from "@/components/theme-customizer";
import { Toaster } from "@/components/ui/sonner";
import { accents, fonts, THEME_CONFIG_STORAGE_KEY } from "@/lib/theme-config";

const themeConfigBootstrap = `(() => {
  try {
    const config = JSON.parse(localStorage.getItem(${JSON.stringify(THEME_CONFIG_STORAGE_KEY)}) || "null");
    if (!config) return;
    const root = document.documentElement;
    root.style.removeProperty("--ring");
    root.style.removeProperty("--sidebar-ring");
    const accents = ${JSON.stringify(Object.fromEntries(accents.map(({ key, primary, fg }) => [key, { primary, fg }]))) };
    const fontStacks = ${JSON.stringify(Object.fromEntries(fonts.map(({ key, stack }) => [key, stack]))) };
    const contentLayouts = { full: true, centered: true };
    const accent = typeof config.accent === "string" ? accents[config.accent] : null;
    if (accent?.primary) {
      root.style.setProperty("--primary", accent.primary);
      root.style.setProperty("--primary-foreground", accent.fg);
      root.style.setProperty("--sidebar-primary", accent.primary);
      root.style.setProperty("--sidebar-primary-foreground", accent.fg);
    }
    if (Number.isFinite(config.radius) && config.radius >= 0 && config.radius <= 1) root.style.setProperty("--radius", config.radius + "rem");
    const font = typeof config.font === "string" ? fontStacks[config.font] : null;
    if (font) root.style.setProperty("--font-sans", font);
    root.dataset.content = typeof config.contentLayout === "string" && contentLayouts[config.contentLayout] ? config.contentLayout : "full";
  } catch {}
})();`;

const geistSans = localFont({
  src: "../../public/fonts/Geist-Variable.ttf",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono-Variable.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "RoseUI",
    template: "%s · RoseUI",
  },
  description:
    "A polished admin & SaaS dashboard template built with Next.js, Tailwind and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <Script id="theme-config-bootstrap" strategy="beforeInteractive">
          {themeConfigBootstrap}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeConfigProvider>
            {children}
            <Toaster />
          </ThemeConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
