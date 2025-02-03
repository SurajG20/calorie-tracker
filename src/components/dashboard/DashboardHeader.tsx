'use client';

import { useSession } from '@/auth-client';
import { format } from 'date-fns';

export function DashboardHeader() {
  const { data } = useSession();
  const today = format(new Date(), 'EEEE, MMMM d');

  return (
    <div className="flex items-center justify-between pb-8">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {data?.user?.name}</h2>
        <p className="text-muted-foreground">{today}</p>
      </div>
    </div>
  );
}
