import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessReviews = await prisma.accessReview.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { nextReview: 'asc' }
    });
    return NextResponse.json(accessReviews);
  } catch (error) {
    console.error('Error fetching access reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch access reviews' }, { status: 500 });
  }
}
