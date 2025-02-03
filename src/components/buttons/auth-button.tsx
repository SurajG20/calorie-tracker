'use client';

import { useSession } from '@/auth-client';
import SignoutButton from '@/components/buttons/signout-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboard, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function AuthButtons() {
  const { data, isPending } = useSession();
  if (isPending) return <div className="animate-pulse h-9 w-20 bg-muted rounded-md" />;

  const session = data;

  return !session ? (
    <>
      <Button variant="outline" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </>
  ) : (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-blue-100 text-blue-600">{data?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{data?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
            <SignoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
