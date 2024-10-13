import clientPromise from './clientPromise';
import { Db, Collection, Document, MongoClient } from 'mongodb';

let client: MongoClient | undefined;
let db: Db | undefined;
let users: Collection<Document> | undefined;

const databaseName: string | undefined = "users";

if (!databaseName) {
  throw new Error('Database is undefined. Not in .env.local (MONGODB_DB)');
}

async function init(): Promise<void> {
    if (db) return;
    try {
        client = await clientPromise;
        db = client.db(databaseName);
        users = db.collection('users');
    } catch (error) {
        console.error('Database connection error:', error); // Log the error
        throw new Error('Failed to establish connection to database');
    }
}

(async () => {
    await init();
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUsers(): Promise<{ users?: any[]; error?: string }> {
    try {
        if (!users) await init();
        
        const result = await users
            ?.find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray();

        return { users: result ?? [] };
     } catch (error) {
        console.error('Error fetching users:', error);
        return { error: 'Failed to fetch users!' };
    }
}