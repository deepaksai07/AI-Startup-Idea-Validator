import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: 'Idea ID is required' }, { status: 400 });
    }

    const idea = await prisma.idea.findUnique({
      where: {
        id: id,
      },
      include: {
        analysis: true,
      },
    });

    if (!idea) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch idea with ID:`, error);
    return NextResponse.json(
      { error: 'Internal server error while fetching the idea' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: 'Idea ID is required' }, { status: 400 });
    }

    // Since onDelete Cascade is not set in the schema, manually delete Analysis first
    await prisma.analysis.deleteMany({
      where: {
        ideaId: id,
      },
    });

    // Delete the Idea itself
    await prisma.idea.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete idea with ID:`, error);
    return NextResponse.json(
      { error: 'Internal server error while deleting the idea' },
      { status: 500 }
    );
  }
}
