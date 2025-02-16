import { auth } from '@/auth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { description } = await request.json();

    if (!description) {
      return NextResponse.json({ message: 'Food description is required' }, { status: 400 });
    }

    const prompt = `Analyze this food description and estimate its nutritional content. 
    Return ONLY a JSON object with exactly these two fields:
    - calories (number): estimated calories
    - protein (number): estimated protein content in grams
    
    Food description: "${description}"
    
    Remember to return ONLY the JSON object, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const nutritionInfo = JSON.parse(text);
      
      if (typeof nutritionInfo.calories !== 'number' || typeof nutritionInfo.protein !== 'number') {
        throw new Error('Invalid response format');
      }
      
      return NextResponse.json(nutritionInfo);
    } catch (parseError) {
      const caloriesMatch = text.match(/calories"?\s*:\s*(\d+)/i);
      const proteinMatch = text.match(/protein"?\s*:\s*(\d+)/i);
      
      const nutritionInfo = {
        calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
        protein: proteinMatch ? parseInt(proteinMatch[1]) : 0
      };
      
      return NextResponse.json(nutritionInfo);
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to analyze food description' , error: error},
      { status: 500 }
    );
  }
} 