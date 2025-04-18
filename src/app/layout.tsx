import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Dravvy - Modern Resume Builder",
  description: "Create professional resumes with various styling options",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
