import { OpenAI } from "openai";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a professional writing assistant. 
        Upgrade the user's message by replacing ordinary words with the **best possible synonyms**. 
        **Do not change the sentence structure, order, or meaning**. 
        Only replace words with more elegant, impressive, or refined alternatives.`,
      },
      { role: "user", content: message },
    ],
  });

  const professionalMessage = response.choices[0].message.content;

  return new Response(JSON.stringify({ professionalMessage }), { status: 200 });
}
