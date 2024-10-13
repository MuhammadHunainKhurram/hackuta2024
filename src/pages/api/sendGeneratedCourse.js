import { MongoClient } from 'mongodb';

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  return client.db();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const db = await connectToDatabase();
    const { title, description, duration, instructor, chapters } = req.body;

    // Insert course data into the database
    const result = await db.collection('courses').insertOne({
      title,
      description,
      duration,
      instructor,
      chapters,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Course data saved successfully', courseId: result.insertedId });
  } catch (error) {
    console.error('Error saving course data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
