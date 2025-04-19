
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getSimplifiedExplanation(text: string, level: string) {
  const apiKey = localStorage.getItem('geminiApiKey');
  
  if (!apiKey) {
    throw new Error('API key not found. Please enter your Gemini API key.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompts = {
    "im-5": `Explain the following text like I'm a 5-year-old. Use simple words, analogies, and examples. Avoid jargon. Text: ${text}`,
    "high-school": `Explain the following text to a high school student. Use age-appropriate examples and some basic technical terms. Text: ${text}`,
    "manager": `Explain the following text to a non-technical manager. Be concise, use real-world analogies, and skip code-heavy details. Text: ${text}`,
    "smart-newbie": `Explain the following text to someone who's intelligent but new to this topic. Provide proper context while maintaining technical accuracy. Text: ${text}`
  };

  const prompt = prompts[level as keyof typeof prompts] || prompts["im-5"];

  const result = await model.generateContent(prompt);
  return result.response.text();
}
