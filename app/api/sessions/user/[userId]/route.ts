import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/sessions/user/:userId - Get user's session history
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const sessions = await prisma.gameSession.findMany({
      where: { userId },
      orderBy: { startTime: 'desc' },
      include: {
        attempts: {
          select: {
            id: true,
            stageId: true,
            successful: true,
            attemptedAt: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user sessions',
      },
      { status: 500 }
    );
  }
}

