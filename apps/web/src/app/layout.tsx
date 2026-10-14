import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { THEME_SCRIPT, ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zen: learn League of Legends from your own games",
  description: "Technical game reviews, champion select help and lessons for League of Legends players.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: THEME_SCRIPT may add the "dark" class before React hydrates.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-ink/10">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3 text-sm">
            <Link href="/" className="text-lg font-semibold tracking-wide">
              Zen
            </Link>
            <Link href="/" className="text-ink/70 hover:text-ink">
              Review
            </Link>
            <Link href="/draft" className="text-ink/70 hover:text-ink">
              Champ select
            </Link>
            <Link href="/learn" className="text-ink/70 hover:text-ink">
              Learn
            </Link>
            <Link href="/settings" className="ml-auto text-ink/50 hover:text-ink">
              Settings
            </Link>
            <ThemeToggle />
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-ink/10 px-4 py-6 text-center text-xs text-ink/40">
          Zen isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone
          officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties
          are trademarks or registered trademarks of Riot Games, Inc.
        </footer>
      </body>
    </html>
  );
}
