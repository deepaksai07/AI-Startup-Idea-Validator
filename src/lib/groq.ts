import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

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

export async function analyzeWithGroq(prompt: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemInstruction
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  return chatCompletion.choices[0]?.message?.content || "";
}
