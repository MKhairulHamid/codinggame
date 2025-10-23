import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const createStageSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['code-format', 'debug', 'generate-numbers', 'data-transform']),
  challenge: z.string(),
  solution: z.string(),
  hint: z.string(),
  order: z.number().int().positive(),
});

// GET /api/stages - Get all stages
export async function GET() {
  try {
    const stages = await prisma.stage.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: stages,
    });
  } catch (error) {
    console.error('Error fetching stages:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stages',
      },
      { status: 500 }
    );
  }
}

// POST /api/stages - Create a new stage (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createStageSchema.parse(body);

    const stage = await prisma.stage.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        success: true,
        data: stage,
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

    console.error('Error creating stage:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create stage',
      },
      { status: 500 }
    );
  }
}

