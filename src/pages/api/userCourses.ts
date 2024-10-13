import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongo/clientPromise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const userEmail = req.query.email as string;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    const courses = await db
      .collection("generated_courses")
      .find({ createdBy: userEmail })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json(courses);
  } catch (e) {
    console.error("Error fetching user courses:", e);
    res.status(500).json({ error: "Unable to fetch user courses" });
  }
}
