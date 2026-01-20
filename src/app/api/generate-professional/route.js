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
        content:
          "Rewrite the following message in a professional tone suitable for Fiverr clients.",
      },
      { role: "user", content: message },
    ],
  });

  const professionalMessage = response.choices[0].message.content;

  return new Response(JSON.stringify({ professionalMessage }), { status: 200 });
}
