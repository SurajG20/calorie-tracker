'use client';

import { authClient } from '@/auth-client';
import LoadingButton from '@/components/buttons/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUp() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          toast({
            title: 'Account created',
            description: 'Your account has been created.',
          });
          router.push('/dashboard');
          router.refresh();
        },
        onError: (ctx) => {
          toast({
            title: 'Error',
            description: ctx.error.message ?? 'Something went wrong.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center text-blue-600">Create Account</CardTitle>
          <p className="text-center text-muted-foreground">Enter your details to get started</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: 'name', label: 'Full Name' },
                { name: 'email', label: 'Email Address' },
                { name: 'password', label: 'Password' },
                { name: 'confirmPassword', label: 'Confirm Password' },
              ].map(({ name, label }) => (
                <FormField
                  control={form.control}
                  key={name}
                  name={name as keyof z.infer<typeof signUpSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={name.includes('password') ? 'password' : name === 'email' ? 'email' : 'text'}
                          placeholder={`Enter your ${name.toLowerCase()}`}
                          {...field}
                          autoComplete={name === 'password' ? 'new-password' : name === 'email' ? 'email' : 'off'}
                          className="bg-white focus:ring-blue-600 focus:border-blue-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <LoadingButton pending={pending}>Create Account</LoadingButton>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
