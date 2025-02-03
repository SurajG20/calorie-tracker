import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Dumbbell, Plus, Scan } from 'lucide-react';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button className="h-20 bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-5 w-5" />
          Add Food
        </Button>
        <Button className="h-20" variant="outline">
          <Scan className="mr-2 h-5 w-5" />
          Scan Barcode
        </Button>
        <Button className="h-20" variant="outline">
          <Droplet className="mr-2 h-5 w-5" />
          Add Water
        </Button>
        <Button className="h-20" variant="outline">
          <Dumbbell className="mr-2 h-5 w-5" />
          Log Exercise
        </Button>
      </CardContent>
    </Card>
  );
}
