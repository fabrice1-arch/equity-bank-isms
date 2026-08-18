import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const encryptionAssets = await prisma.encryptionAsset.findMany({
      orderBy: { system: 'asc' }
    });
    return NextResponse.json(encryptionAssets);
  } catch (error) {
    console.error('Error fetching encryption assets:', error);
    return NextResponse.json({ error: 'Failed to fetch encryption assets' }, { status: 500 });
  }
}
