import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
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
    
    for (let i = 1; i <= chapters; i++) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant generating educational content for courses. We will provide you with a course description ",
          },
          {
            role: "user",
            content: `Generate a course guide in JSON format following these details:
            - User ID as (userId): ${userId}
            - Course Description as (description): ${description}
            - Include Video as (includeVideo): ${includeVideo}
            - Chapters as (chapters): (this is a nested object, each chapter has number, title, and content. In this course, there are ${chapters} chapters.)
              - number as (chapterNumber): (you fill this in based on the current chapter number, this is also nested.)
              -   title as (chapterName): (you fill this in based on what you think the current chapter title should be)
              -   content as (content): (this is an empty JSON string. you do not need to input anything in this field.)
              
              example: userId = "user_2nNA9j0s0tptwKumnDZYExEFWrg", description = "Introduction to Python", includeVideo = false, chapters = 1
                            {
                "userId": "user_2nNA9j0s0tptwKumnDZYExEFWrg",
                "description": "Introduction to Python",
                "includeVideo": false,
                "chapters": [
                  {
                    "chapterNumber": 1,
                    "chapterName": "Chapter 1",
                    "content": { (THIS IS ALWAYS EMPTY!!! DO NOT WRITE ANYTHING IN CONTENT!)                   
                    }
                  }
                ]
              }
              `,          },
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
