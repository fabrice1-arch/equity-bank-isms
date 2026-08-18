import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const incidents = await prisma.incident.findMany({
      include: { 
        reporter: { select: { name: true } }, 
        assignee: { select: { name: true } } 
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}
