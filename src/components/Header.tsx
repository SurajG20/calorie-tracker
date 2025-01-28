import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-rose-500">AI Calorie Tracker</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button className="bg-rose-500 text-white hover:bg-rose-600" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
