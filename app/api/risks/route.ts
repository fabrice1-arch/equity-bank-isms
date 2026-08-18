import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const risks = await prisma.risk.findMany({
      include: { owner: { select: { name: true } } },
      orderBy: { riskScore: 'desc' }
    });
    return NextResponse.json(risks);
  } catch (error) {
    console.error('Error fetching risks:', error);
    return NextResponse.json({ error: 'Failed to fetch risks' }, { status: 500 });
  }
}
