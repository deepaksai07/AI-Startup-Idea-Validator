import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const systemInstruction = `You are an expert startup consultant.

Analyze the given startup idea and return a structured JSON object with:

{
  "problem": "",
  "customer": "",
  "market": "",
  "competitor": [
    { "name": "", "difference": "" },
    { "name": "", "difference": "" },
    { "name": "", "difference": "" }
  ],
  "tech_stack": [],
  "risk_level": "",
  "profitability_score": 0,
  "justification": ""
}

Rules:
- Return ONLY JSON
- No extra text
- Keep answers concise and realistic
- competitor must be exactly 3
- tech_stack must be 4-6 items
- profitability_score 0-100`;

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
