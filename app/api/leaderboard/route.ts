import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const createLeaderboardEntrySchema = z.object({
  userId: z.string(),
  completionTime: z.number().int().positive(),
});

// GET /api/leaderboard - Get top completion times
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const leaderboard = await prisma.leaderboard.findMany({
      take: limit,
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

    return NextResponse.json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leaderboard',
      },
      { status: 500 }
    );
  }
}

// POST /api/leaderboard - Add entry to leaderboard
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createLeaderboardEntrySchema.parse(body);

    const entry = await prisma.leaderboard.create({
      data: validatedData,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: entry,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Error creating leaderboard entry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create leaderboard entry',
      },
      { status: 500 }
    );
  }
}

