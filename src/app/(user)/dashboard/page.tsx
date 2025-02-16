'use client';

import LoadingButton from '@/components/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { z } from 'zod';
import { foodEntrySchema } from '@/lib/zod';

type FoodEntry = {
  id: string;
  description: string;
  calories: number;
  protein: number;
  timestamp: string;
};

export default function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof foodEntrySchema>>({
    resolver: zodResolver(foodEntrySchema),
    defaultValues: {
      description: '',
    },
  });

  const analyzeFoodWithAI = async (description: string) => {
    const response = await fetch('/api/analyze-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze food');
    }

    return response.json();
  };

  const onSubmit = async (values: z.infer<typeof foodEntrySchema>) => {
    try {
      setIsSubmitting(true);

      const nutritionInfo = await analyzeFoodWithAI(values.description);

      const newEntry: FoodEntry = {
        id: crypto.randomUUID(),
        description: values.description,
        calories: nutritionInfo.calories,
        protein: nutritionInfo.protein,
        timestamp: new Date().toISOString(),
      };

      setFoodEntries((prev) => [...prev, newEntry]);

      form.reset();
      setIsModalOpen(false);

      toast({
        title: 'Food entry added',
        description: 'Your food entry has been successfully logged.',
      });
    } catch (error) {

      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze food entry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Food Tracker</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Food Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Food Entry</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What did you eat?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your meal (e.g., '2 scrambled eggs with toast and butter')"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <LoadingButton pending={isSubmitting} type="submit">
                  Add Entry
                </LoadingButton>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={foodEntries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="calories" stroke="#8884d8" name="Calories" />
                <Line type="monotone" dataKey="protein" stroke="#82ca9d" name="Protein (g)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No food entries yet. Start by adding your first meal!
                </p>
              ) : (
                foodEntries
                  .map((entry) => (
                    <div key={entry.id} className="p-4 border rounded-lg space-y-2">
                      <p className="font-medium">{entry.description}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Calories: {entry.calories}</span>
                        <span>Protein: {entry.protein}g</span>
                        <span>{new Date(entry.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                  .reverse()
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
