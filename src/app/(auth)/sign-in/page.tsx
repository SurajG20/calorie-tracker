'use client';

import { authClient } from '@/auth-client';
import LoadingButton from '@/components/buttons/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signInSchema } from '@/lib/zod';
import { ErrorContext } from '@better-fetch/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingCredentials, setPendingCredentials] = useState(false);
  const [pendingGithub, setPendingGithub] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleCredentialsSignIn = async (values: z.infer<typeof signInSchema>) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          router.push('/dashboard');
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          });
        },
      },
    );
    setPendingCredentials(false);
  };

  const handleSignInWithGithub = async () => {
    await authClient.signIn.social(
      {
        provider: 'github',
      },
      {
        onRequest: () => {
          setPendingGithub(true);
        },
        onSuccess: async () => {
          router.push('/dashboard');
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          toast({
            title: 'Something went wrong',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          });
        },
      },
    );
    setPendingGithub(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
          <p className="text-center text-muted-foreground">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCredentialsSignIn)} className="space-y-4">
              {['email', 'password'].map((field) => (
                <FormField
                  control={form.control}
                  key={field}
                  name={field as keyof z.infer<typeof signInSchema>}
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={field === 'password' ? 'password' : 'email'}
                          placeholder={`Enter your ${field}`}
                          {...fieldProps}
                          autoComplete={field === 'password' ? 'current-password' : 'email'}
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={pendingCredentials}>Sign in with Email</LoadingButton>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <LoadingButton pending={pendingGithub} onClick={handleSignInWithGithub}>
            <GithubIcon className="w-4 h-4 mr-2" />
            GitHub
          </LoadingButton>

          <div className="text-center space-y-2">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot your password?
            </Link>
            <div className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
