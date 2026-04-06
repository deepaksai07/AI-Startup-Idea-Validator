import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractStartupAnalysis } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, description } = json;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required and must not be empty' },
        { status: 400 }
      );
    }

    const idea = await prisma.idea.create({
      data: {
        title: title.trim(),
        description: description.trim(),
      },
    });

    try {
      const analysisData = await extractStartupAnalysis(idea.title, idea.description);

      await prisma.analysis.create({
        data: {
          ideaId: idea.id,
          problem: analysisData.problem || '',
          customer: analysisData.customer || '',
          market: analysisData.market || '',
          competitor: analysisData.competitor ? JSON.parse(JSON.stringify(analysisData.competitor)) : [],
          tech_stack: analysisData.tech_stack ? JSON.parse(JSON.stringify(analysisData.tech_stack)) : [],
          risk_level: analysisData.risk_level || 'Unknown',
          profitability_score: analysisData.profitability_score || 0,
          justification: analysisData.justification || ''
        }
      });
    } catch (aiError) {
      console.error("Non-fatal AI processing error for idea", idea.id, aiError);
      // Gracefully fallback: Return the idea even if AI processing fails on network limit or syntax layer
    }

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Failed to create idea:', error);
    return NextResponse.json(
      { error: 'Internal server error while creating idea' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch ideas:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching ideas' },
      { status: 500 }
    );
  }
}
