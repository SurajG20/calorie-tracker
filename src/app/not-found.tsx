import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="bg-rose-500 text-white hover:bg-rose-600">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
