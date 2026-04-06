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
