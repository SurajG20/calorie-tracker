'use client';

import { CaloriesSummary } from '@/components/dashboard/CaloriesSummary';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MealsTimeline } from '@/components/dashboard/MealsTimeline';
import { QuickActions } from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 space-y-8 flex flex-col max-w-7xl  w-full">
      <DashboardHeader />

      <div className="grid grid-cols-3 gap-6">
        <CaloriesSummary />
        <QuickActions />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <MealsTimeline />
        </div>
      </div>
    </div>
  );
}
