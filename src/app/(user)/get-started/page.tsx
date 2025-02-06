'use client';

import LoadingButton from '@/components/buttons/loading-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { userInfoSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      height: 0,
      weight: 0,
      age: 0,
      gender: '',
      goal: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof userInfoSchema>) => {
    setPending(true);
    try {
      const response = await fetch('/api/user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast({
          title: 'Something went wrong',
          description: 'Your information has not been saved.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Success',
        description: 'Your information has been saved.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col items-center space-y-6 text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight">Get Started</h1>
          <p className="text-muted-foreground max-w-2xl text-xl">
            Tell us about yourself so we can personalize your nutrition journey
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter height"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-10 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-10 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-10 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              key="gender"
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="goal"
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Goal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lose">Lose weight</SelectItem>
                      <SelectItem value="gain">Gain weight</SelectItem>
                      <SelectItem value="maintain">Maintain weight</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <LoadingButton pending={pending} type="submit">
              Continue
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
