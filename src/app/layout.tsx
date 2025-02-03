import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'AI Calorie Tracker',
    template: '%s | AI Calorie Tracker',
  },
  description: 'Track your calories and nutrition with AI-powered food recognition',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
