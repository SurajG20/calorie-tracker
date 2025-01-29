import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CaloriesSummary() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-4xl font-bold text-blue-600">1,450</p>
            <p className="text-sm text-muted-foreground">of 2,000 calories</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-blue-600">550</p>
            <p className="text-sm text-muted-foreground">calories remaining</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Protein</span>
              <span className="text-sm text-muted-foreground">65g / 150g</span>
            </div>
            <Progress value={43} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Carbs</span>
              <span className="text-sm text-muted-foreground">180g / 250g</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Fat</span>
              <span className="text-sm text-muted-foreground">48g / 70g</span>
            </div>
            <Progress value={69} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 