'use client';

import AuthButtons from '@/components/buttons/auth-button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">Neutrino</h1>
        </Link>
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
