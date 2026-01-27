import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `You are a professional writing assistant. 
Upgrade the user's message by replacing ordinary words with the **best possible synonyms**. 
**Do not change the sentence structure, order, or meaning**. 
Only replace words with more elegant, impressive, or refined alternatives.

User's message: ${message}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const professionalMessage = response.text();

  return new Response(JSON.stringify({ professionalMessage }), { status: 200 });
}
