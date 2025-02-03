'use client';

import { authClient } from '@/auth-client';
import LoadingButton from '@/components/buttons/loading-button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignoutButton() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <LoadingButton pending={pending} onClick={handleSignOut}>
      Sign Out
    </LoadingButton>
  );
}
