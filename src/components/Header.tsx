"use client"
import { Button } from '@/components/ui/button';
import { signOut, authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { 
    data: session, 
    isPending
  } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-rose-500">AI Calorie Tracker</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="animate-pulse h-9 w-20 bg-muted rounded-md" />
          ) : session ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                className="bg-rose-500 text-white hover:bg-rose-600"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button className="bg-rose-500 text-white hover:bg-rose-600" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
