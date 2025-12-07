import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser:true
});

export const calculateCaloriesAI = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
  });

  return response.choices[0].message.content;
};

export const GenerateWithAi = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
  });

  return response.choices[0].message.content;
};


// New image generation function
// export const GenerateImageWithAI = async (prompt) => {
//   const response = await openai.images.generate({
//     model: "stabilityai/stable-image",
//     prompt,
//     size: "1024x1024",
//   });

//   return response.data[0].url;
// };
