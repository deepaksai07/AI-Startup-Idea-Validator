import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Startup Idea Validator",
  description: "Validate your startup ideas using AI — get instant feedback on market fit, competitors, and profitability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-purple-500/30">
        {/* Fixed ambient gradient layer */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/30 via-slate-950 to-slate-950 pointer-events-none" />

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">💡</span>
              <span className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors duration-300">
                IdeaValidator<span className="text-purple-400">.ai</span>
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/"
                className="rounded-xl font-semibold text-white px-4 py-2 text-sm
                  bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                  shadow-[0_0_12px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]
                  transition-all duration-300"
              >
                + New Idea
              </Link>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
