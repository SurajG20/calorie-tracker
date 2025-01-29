import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const cardContent = [
  {
    title: 'Log meals in natural language',
    description:
      'Simply describe what you ate in everyday language. Our AI understands and automatically calculates calories and nutrients, making food tracking effortless.',
  },
  {
    title: 'Get personalized insights',
    description:
      'Receive detailed analytics about your eating patterns, nutrient intake, and actionable recommendations tailored to your health goals and preferences.',
  },
  {
    title: 'Track progress intelligently',
    description:
      'Monitor your journey with smart progress tracking, celebrating milestones while getting AI-powered suggestions to optimize your nutrition habits.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-7xl space-y-20">
        <section className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight">Take Control of Your Nutrition Journey</h1>
          <p className="text-muted-foreground max-w-2xl text-xl">
            Log meals in natural language, track calories effortlessly, and achieve your health goals with personalized
            AI-powered insights.
          </p>
          <Link href="/sign-in">
            <Button size="lg" className="bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700">
              Get Started Free
            </Button>
          </Link>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardContent.map((content, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{content.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-8">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              'Set your personal goals and preferences',
              'Track your daily meals and activities',
              'Get insights and adjust your habits',
              'Achieve your health goals',
            ].map((step, i) => (
              <Card key={i} className="flex flex-col items-center p-4 text-center">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold
                    text-blue-600"
                >
                  {i + 1}
                </div>
                <p className="font-medium">{step}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
