import { analyzeWithGemini } from './gemini';
import { analyzeWithGroq } from './groq';

export interface AnalysisResult {
  problem: string;
  customer: string;
  market: string;
  competitor: Array<{ name: string; difference: string }>;
  tech_stack: string[];
  risk_level: string;
  profitability_score: number;
  justification: string;
}

export async function extractStartupAnalysis(title: string, description: string): Promise<AnalysisResult> {
  const provider = process.env.AI_PROVIDER || 'gemini';
  const prompt = `Input:\nTitle: ${title}\nDescription: ${description}`;

  let rawContent = "";

  try {
    if (provider.toLowerCase() === 'groq') {
      rawContent = await analyzeWithGroq(prompt);
    } else {
      rawContent = await analyzeWithGemini(prompt);
    }

    if (!rawContent) {
      throw new Error("AI returned empty response");
    }

    // Clean up Markdown JSON blocks if AI ignored response JSON enforcement
    let cleaned = rawContent.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.substring(7);
    if (cleaned.startsWith('```')) cleaned = cleaned.substring(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.substring(0, cleaned.length - 3);
    cleaned = cleaned.trim();

    const data = JSON.parse(cleaned) as AnalysisResult;

    return data;
  } catch (error) {
    console.error(`AI Analysis extraction failed using provider [${provider}]:`, error);
    throw error;
  }
}
