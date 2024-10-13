import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { description, chapters, userId, includeVideo, includeQuiz } = req.body;

  try {
    const courseContent = [];
    
    // Generate content for each chapter individually
    for (let i = 1; i <= chapters; i++) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant generating educational content for courses.",
          },
          {
            role: "user",
            content: `Generate a course guide in JSON format with the following details:
            - Course Description: ${description}
            - Number of Chapters: ${chapters}
            - Include Video: ${includeVideo}
            - Include Quiz: ${includeQuiz}
            - User ID: ${userId}
  
            For each chapter, include:
            - Chapter Number
            - Chapter Name
            - A Summary of Chapter Content.
            - An Empty JSON String Called Content, that will be filled later`,          },
        ],
        temperature: 0.7,
        max_tokens: 400,
      });

      const message = response.choices?.[0]?.message?.content?.trim();
      if (!message) throw new Error("Failed to generate content.");

      courseContent.push({
        chapterNumber: i,
        chapterName: `Chapter ${i}`,
        content: message,
      });
    }

    // Prepare course data to be saved
    const courseData = {
      userId,
      description,
      includeVideo,
      includeQuiz,
      chapters: courseContent,
      createdAt: new Date(),
    };

    // Save to MongoDB
    await client.connect();
    const database = client.db("HackUTA2024");
    const coursesCollection = database.collection("generated_courses");

    const result = await coursesCollection.insertOne(courseData);
    await client.close();

    console.log("Course saved:", result.insertedId);

    res.status(200).json({
      message: "Course generated and saved successfully.",
      courseId: result.insertedId,
    });
  } catch (error) {
    console.error("Error generating course guide:", error);
    res.status(500).json({ error: "Failed to generate course guide." });
  }
}
