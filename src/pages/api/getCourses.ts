import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const database = client.db("HackUTA2024");
    const courses = database.collection("generated_courses");

    const allCourses = await courses.find({}).toArray(); // Fetch all courses
    res.status(200).json(allCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  } finally {
    await client.close();
  }
}
