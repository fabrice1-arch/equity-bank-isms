import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const totalRisks = await prisma.risk.count();
    const criticalRisks = await prisma.risk.count({ where: { level: 'CRITICAL' } });
    const openIncidents = await prisma.incident.count({ 
      where: { status: { in: ['OPEN', 'IN_PROGRESS', 'CONTAINED'] } } 
    });
    const totalUsers = await prisma.user.count();
    const activePolicies = await prisma.policy.count({ where: { status: 'ACTIVE' } });
    const totalPoliciesCount = await prisma.policy.count();
    
    let complianceScore = 0;
    if (totalPoliciesCount > 0) {
      complianceScore = (activePolicies / totalPoliciesCount) * 100;
    }

    return NextResponse.json({
      totalRisks,
      criticalRisks,
      openIncidents,
      totalUsers,
      activePolicies,
      complianceScore
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
