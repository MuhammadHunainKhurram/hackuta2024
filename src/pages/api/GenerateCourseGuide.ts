import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Log the environment variable to ensure it's being loaded correctly
console.log("OPENAI_API_KEY from env:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { description, chapters } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that generates course guides in JSON format.",
        },
        {
          role: "user",
          content: `Generate a course guide in JSON format based on the number of chapters and course description provided by the user. Include: Chapter Number, Chapter Name, and Summary of Chapter Content.\n\nCourse Description: ${description}\nNumber of Chapters: ${chapters}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const message = response.choices?.[0]?.message?.content?.trim();
    if (!message) throw new Error("No content received from OpenAI.");

    console.log("Generated Course Guide:", message); // Log JSON

    res.status(200).json({ courseGuide: JSON.parse(message) });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate course guide" });
  }
}
