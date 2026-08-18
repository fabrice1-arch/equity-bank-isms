import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const courses = await prisma.trainingCourse.findMany({
      include: { results: true },
      orderBy: { dueDate: 'asc' }
    });
    const simulations = await prisma.phishingSimulation.findMany({
      orderBy: { conductedAt: 'desc' }
    });
    
    return NextResponse.json({ courses, simulations });
  } catch (error) {
    console.error('Error fetching training data:', error);
    return NextResponse.json({ error: 'Failed to fetch training data' }, { status: 500 });
  }
}
