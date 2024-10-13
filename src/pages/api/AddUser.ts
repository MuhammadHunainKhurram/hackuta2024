import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userId, email, name } = req.body;

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const database = client.db('eduGenieDB');
      const usersCollection = database.collection('users');

      const existingUser = await usersCollection.findOne({ userId });

      if (!existingUser) {
        const result = await usersCollection.insertOne({ userId, email, name });
        res.status(201).json({ message: 'User added', result });
      } else {
        res.status(409).json({ message: 'User already exists' });
      }

      await client.close();
    } catch (error) {
      console.error('MongoDB Error:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
