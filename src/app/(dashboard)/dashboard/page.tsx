import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { CaloriesSummary } from "@/components/dashboard/CaloriesSummary"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { MealsTimeline } from "@/components/dashboard/MealsTimeline"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
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