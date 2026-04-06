import Groq from 'groq-sdk';

import fs from 'fs';
import path from 'path';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

// Load system instruction from external file
const promptPath = path.join(process.cwd(), 'prompts', 'system_prompt.txt');
const systemInstruction = fs.readFileSync(promptPath, 'utf8');

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
