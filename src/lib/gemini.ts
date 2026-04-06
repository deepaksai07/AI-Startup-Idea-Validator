import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const systemInstruction = `You are an expert startup consultant.
Analyze the given startup idea and return a strictly valid JSON object.
JSON Schema:
{
  "problem": "One sentence defining the core problem",
  "customer": "Exactly who suffers from this",
  "market": "TAM/SAM calculation or market size description",
  "competitor": [
    { "name": "Direct/Indirect Competitor", "difference": "Your unique value prop vs them" }
  ],
  "tech_stack": ["Tool1", "Tool2", "Tool3", "Tool4"],
  "risk_level": "Low/Medium/High",
  "profitability_score": 0-100,
  "justification": "2-3 sentences explaining the score"
}

Constraints:
- Return ONLY the JSON object.
- Competitor array must have exactly 3 items.
- Tech stack must have 4-6 modern, relevant tools.
- Be critical but constructive.`;

export async function analyzeWithGemini(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      temperature: 0.2,
    }
  });

  return response.text || "";
}
