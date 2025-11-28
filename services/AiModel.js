import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const calculateCaloriesAI = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
  });

  return response.choices[0].message.content;
};
