import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AI Calorie Tracker',
    template: '%s | AI Calorie Tracker',
  },
  description: 'Track your calories and nutrition with AI-powered food recognition',
  openGraph: {
    title: 'AI Calorie Tracker',
    description: 'Track your calories and nutrition with AI-powered food recognition',
    type: 'website',
    siteName: 'AI Calorie Tracker',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
