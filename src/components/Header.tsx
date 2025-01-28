import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-primary">AI Calorie Tracker</h1>
      </div>
      <div className="flex items-center gap-2"  >
        <Button variant="outline">
          <LogIn />
        </Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}
