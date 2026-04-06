import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

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
