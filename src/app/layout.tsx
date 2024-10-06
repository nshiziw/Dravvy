import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/error-boundary'

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
  title: "Dravvy - Resume Builder",
  description: "Create professional resumes with ease",
  keywords: ['resume', 'cv', 'builder', 'job', 'career'],
  authors: [{ name: 'Dravvy' }],
  creator: 'Dravvy',
  publisher: 'Dravvy',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'white',
                color: 'black',
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
