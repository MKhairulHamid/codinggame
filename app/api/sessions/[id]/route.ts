import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for updates
const updateSessionSchema = z.object({
  endTime: z.string().datetime().optional(),
  completed: z.boolean().optional(),
  totalTime: z.number().int().optional(),
});

// GET /api/sessions/:id - Get session by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await prisma.gameSession.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        attempts: {
          include: {
            stage: true,
          },
          orderBy: {
            attemptedAt: 'asc',
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Session not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch session',
      },
      { status: 500 }
    );
  }
}

// PUT /api/sessions/:id - Update session (complete/end)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateSessionSchema.parse(body);

    // Convert endTime string to Date if provided
    const updateData: any = { ...validatedData };
    if (validatedData.endTime) {
      updateData.endTime = new Date(validatedData.endTime);
    }

    const session = await prisma.gameSession.update({
      where: { id },
      data: updateData,
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
      data: session,
    });
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

    console.error('Error updating session:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update session',
      },
      { status: 500 }
    );
  }
}

