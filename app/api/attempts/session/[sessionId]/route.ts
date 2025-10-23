import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/attempts/session/:sessionId - Get all attempts for a session
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const attempts = await prisma.stageAttempt.findMany({
      where: { sessionId },
      orderBy: { attemptedAt: 'asc' },
      include: {
        stage: {
          select: {
            id: true,
            title: true,
            type: true,
            order: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error('Error fetching session attempts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch session attempts',
      },
      { status: 500 }
    );
  }
}

