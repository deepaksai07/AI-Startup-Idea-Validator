import { GoogleGenAI } from '@google/genai';

import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Load system instruction from external file
const promptPath = path.join(process.cwd(), 'prompts', 'system_prompt.txt');
const systemInstruction = fs.readFileSync(promptPath, 'utf8');

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
