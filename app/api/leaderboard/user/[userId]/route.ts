import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/leaderboard/user/:userId - Get user's best time
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const bestTime = await prisma.leaderboard.findFirst({
      where: { userId },
      orderBy: { completionTime: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!bestTime) {
      return NextResponse.json(
        {
          success: false,
          error: 'No leaderboard entry found for this user',
        },
        { status: 404 }
      );
    }

    // Get user's rank
    const betterTimes = await prisma.leaderboard.count({
      where: {
        completionTime: {
          lt: bestTime.completionTime,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...bestTime,
        rank: betterTimes + 1,
      },
    });
  } catch (error) {
    console.error('Error fetching user leaderboard:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user leaderboard',
      },
      { status: 500 }
    );
  }
}

