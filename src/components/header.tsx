'use client';

import AuthButtons from '@/components/buttons/auth-button';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-blue-600">Neutrino</h1>
        </Link>
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}
