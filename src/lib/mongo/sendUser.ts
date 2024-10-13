import clientPromise from '@/lib/mongo/clientPromise';
import { Db } from 'mongodb';

const databaseName: string | undefined = "users";

if (!databaseName) {
  throw new Error('Database is undefined. Make sure to set MONGODB_DB in your .env file.');
}

export interface UserData {
userID: string;
userEmail: string;
}

export async function sendUser(userData: UserData) {
    try {
      const client = await clientPromise;
      const db: Db = client.db(databaseName);
      const result = await db.collection('users').insertOne(userData);
      console.log(result);
      console.log(result.insertedId);
      return result.insertedId;
      
    } catch (error) {
      console.error('Failed to send user:', error);
      throw error;
    }
  }
