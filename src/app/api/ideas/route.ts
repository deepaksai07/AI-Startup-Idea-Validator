import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { extractStartupAnalysis } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { title, description } = json;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return NextResponse.json(
        { error: 'Title must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Check for API key availability based on provider
    const provider = process.env.AI_PROVIDER || 'gemini';
    const apiKey = provider === 'groq' ? process.env.GROQ_API_KEY : process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn(`Warning: AI_PROVIDER is set to ${provider} but the corresponding API key is missing.`);
      // We continue anyway, the analysis block will handle the error gracefully
    }

    const idea = await prisma.idea.create({
      data: {
        title: title.trim(),
        description: description.trim(),
      },
    });

    // Run AI analysis
    try {
      const analysisData = await extractStartupAnalysis(idea.title, idea.description);

      await prisma.analysis.create({
        data: {
          ideaId: idea.id,
          problem: analysisData.problem || 'Analysis pending',
          customer: analysisData.customer || 'Analysis pending',
          market: analysisData.market || 'Analysis pending',
          competitor: analysisData.competitor || [],
          tech_stack: analysisData.tech_stack || [],
          risk_level: analysisData.risk_level || 'Unknown',
          profitability_score: analysisData.profitability_score || 0,
          justification: analysisData.justification || 'Analysis failed or was skipped'
        }
      });
    } catch (aiError) {
      console.error(`AI processing failed for idea ${idea.id}:`, aiError instanceof Error ? aiError.message : aiError);
      // Non-fatal: the idea is already in the DB, analysis is just missing
    }

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
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
