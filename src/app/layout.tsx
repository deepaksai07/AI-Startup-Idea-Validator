import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "AI Startup Idea Validator",
  description: "Validate your startup ideas using AI — get instant feedback on market fit, competitors, and profitability.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-violet-500/20 overflow-x-hidden"
        style={{ background: '#050508', color: '#f0f0f5' }}>

        <Navbar />

        <div className="flex-1 flex flex-col page-enter">
          {children}
        </div>

      </body>
    </html>
  );
}
