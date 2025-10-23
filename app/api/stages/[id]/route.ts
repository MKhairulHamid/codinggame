import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for updates
const updateStageSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  type: z.enum(['code-format', 'debug', 'generate-numbers', 'data-transform']).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  hint: z.string().optional(),
  order: z.number().int().positive().optional(),
});

// GET /api/stages/:id - Get stage by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stageId = parseInt(id);

    if (isNaN(stageId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid stage ID',
        },
        { status: 400 }
      );
    }

    const stage = await prisma.stage.findUnique({
      where: { id: stageId },
    });

    if (!stage) {
      return NextResponse.json(
        {
          success: false,
          error: 'Stage not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: stage,
    });
  } catch (error) {
    console.error('Error fetching stage:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stage',
      },
      { status: 500 }
    );
  }
}

// PUT /api/stages/:id - Update stage (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stageId = parseInt(id);

    if (isNaN(stageId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid stage ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = updateStageSchema.parse(body);

    const stage = await prisma.stage.update({
      where: { id: stageId },
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: stage,
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

    console.error('Error updating stage:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update stage',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/stages/:id - Delete stage (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stageId = parseInt(id);

    if (isNaN(stageId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid stage ID',
        },
        { status: 400 }
      );
    }

    await prisma.stage.delete({
      where: { id: stageId },
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Stage deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting stage:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete stage',
      },
      { status: 500 }
    );
  }
}

