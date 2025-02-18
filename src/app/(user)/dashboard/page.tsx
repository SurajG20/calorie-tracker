'use client';

import LoadingButton from '@/components/buttons/loading-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { z } from 'zod';

const foodEntrySchema = z.object({
  description: z.string().min(1, 'Please describe what you ate'),
});

type FoodEntry = {
  id: string;
  date: string;
  food: {
    id: string;
    description: string;
    calories: number;
    protein: number;
  };
};

export default function Dashboard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof foodEntrySchema>>({
    resolver: zodResolver(foodEntrySchema),
    defaultValues: {
      description: '',
    },
  });

  const fetchFoodEntries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/food-entry');

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to fetch food entries');
      }

      const data = await response.json();
      console.log('Fetched food entries:', data);
      setFoodEntries(data);
    } catch (error) {
      console.error('Error fetching food entries:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch food entries',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodEntries();
  }, []);

  const analyzeFoodWithAI = async (description: string) => {
    const response = await fetch('/api/analyze-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to analyze food');
    }

    const data = await response.json();
    console.log('AI analysis result:', data);
    return data;
  };

  const onSubmit = async (values: z.infer<typeof foodEntrySchema>) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting food entry:', values);

      // First analyze the food with AI
      const nutritionInfo = await analyzeFoodWithAI(values.description);
      console.log('Nutrition info:', nutritionInfo);

      // Then save the food entry
      const response = await fetch('/api/food-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: values.description,
          calories: nutritionInfo.calories,
          protein: nutritionInfo.protein,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to save food entry');
      }

      const savedEntry = await response.json();
      console.log('Saved food entry:', savedEntry);

      // Refresh the food entries list
      await fetchFoodEntries();

      form.reset();
      setIsModalOpen(false);

      toast({
        title: 'Food entry added',
        description: 'Your food entry has been successfully logged.',
      });
    } catch (error) {
      console.error('Error adding food entry:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add food entry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const chartData = foodEntries.map((entry) => ({
    timestamp: entry.date,
    calories: entry.food.calories,
    protein: entry.food.protein,
  }));

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
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} />
                  <YAxis />
                  <Tooltip labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()} />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" name="Calories" />
                  <Line type="monotone" dataKey="protein" stroke="#82ca9d" name="Protein (g)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground text-center py-4">Loading...</p>
              ) : foodEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No food entries yet. Start by adding your first meal!
                </p>
              ) : (
                foodEntries.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-lg space-y-2">
                    <p className="font-medium">{entry.food.description}</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Calories: {entry.food.calories}</span>
                      <span>Protein: {entry.food.protein}g</span>
                      <span>{new Date(entry.date).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
