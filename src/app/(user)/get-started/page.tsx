import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Page() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center space-y-6 text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">Get Started</h1>
          <p className="text-muted-foreground max-w-2xl text-xl">
            Tell us about yourself so we can personalize your nutrition journey
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input type="number" id="height" placeholder="Enter height" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input type="number" id="weight" placeholder="Enter weight" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input type="number" id="age" placeholder="Enter age" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Goal</Label>
              <Select required>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
