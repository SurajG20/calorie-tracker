import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const foodEntrySchema = z.object({
  description: z.string().min(1, 'Please describe what you ate'),
  calories: z.number(),
  protein: z.number()
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const validatedData = foodEntrySchema.parse(body);

    console.log('Creating food entry with data:', validatedData);

    // Create the food record
    const food = await prisma.food.create({
      data: {
        description: validatedData.description,
        calories: validatedData.calories,
        protein: validatedData.protein,
        userId: session.user.id,
      },
    });

    console.log('Created food record:', food);

    // Create the food entry
    const foodEntry = await prisma.foodEntry.create({
      data: {
        userId: session.user.id,
        foodId: food.id,
      },
      include: {
        food: true,
      },
    });

    console.log('Created food entry:', foodEntry);
    return NextResponse.json(foodEntry);
  } catch (error) {
    console.error('Error creating food entry:', error);
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('Fetching food entries for user:', session.user.id);

    const foodEntries = await prisma.foodEntry.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        food: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    console.log('Found food entries:', foodEntries);
    return NextResponse.json(foodEntries);
  } catch (error) {
    console.error('Error fetching food entries:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 