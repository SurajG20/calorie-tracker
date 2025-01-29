import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function MealsTimeline() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Meals</CardTitle>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
          <div key={meal} className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <h4 className="font-semibold">{meal}</h4>
              <p className="text-sm text-muted-foreground">8:00 AM</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-blue-600 font-semibold">320 cal</p>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 