import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pending: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export default function LoadingButton({
  children,
  pending,
  className,
  variant = 'default',
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn(
        'w-full',
        variant === 'default' && 'bg-blue-600 hover:bg-blue-700 text-white',
        variant === 'ghost' && 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
        variant === 'outline' && 'border-blue-600 text-blue-600 hover:bg-blue-50',
        className,
      )}
      disabled={pending}
      variant={variant}
      {...props}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
