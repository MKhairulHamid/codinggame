import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const createAttemptSchema = z.object({
  sessionId: z.string(),
  stageId: z.number().int().positive(),
  userCode: z.string(),
  successful: z.boolean(),
  hintsUsed: z.number().int().min(0).default(0),
});

// POST /api/attempts - Record a stage attempt
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createAttemptSchema.parse(body);

    const attempt = await prisma.stageAttempt.create({
      data: validatedData,
      include: {
        stage: true,
        session: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: attempt,
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

    console.error('Error creating attempt:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create attempt',
      },
      { status: 500 }
    );
  }
}

