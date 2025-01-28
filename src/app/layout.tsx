import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: {
    default: "AI Calorie Tracker",
    template: "%s | AI Calorie Tracker",
  },
  description: "Track your calories and nutrition with AI-powered food recognition",
  openGraph: {
    title: "AI Calorie Tracker",
    description: "Track your calories and nutrition with AI-powered food recognition",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-background text-foreground antialiased min-h-screen `}>
        {children}
      </body>
    </html>
  );
}
