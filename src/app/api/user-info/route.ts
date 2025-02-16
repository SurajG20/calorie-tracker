import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { userInfoSchema } from '@/lib/zod';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = userInfoSchema.safeParse(body);

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user.id) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (!result.success) {
      return NextResponse.json({ message: 'Invalid input', errors: result.error.errors }, { status: 400 });
    }

    const { height, weight, age, gender, goal } = result.data;
    const now = new Date();

    const newUserInfo = await prisma.userInfo.create({
      data: {
        id: crypto.randomUUID(),
        userId: session.user.id,
        height,
        weight,
        age,
        gender,
        goal,
        createdAt: now,
        updatedAt: now,
      },
    });

    return NextResponse.json(newUserInfo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'An unexpected error occurred', error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user.id) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userInfo = await prisma.userInfo.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ hasUserInfo: !!userInfo });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'An unexpected error occurred', error }, { status: 500 });
  }
}
