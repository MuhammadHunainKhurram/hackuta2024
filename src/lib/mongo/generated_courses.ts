import clientPromise from './clientPromise';
import { Db, Collection, Document, MongoClient } from 'mongodb';

let client: MongoClient | undefined;
let db: Db | undefined;
let generated_courses: Collection<Document> | undefined;

const databaseName: string | undefined = process.env.MONGODB_DB;

if (!databaseName) {
  throw new Error('Database is undefined. Not in .env.local (MONGODB_DB)');
}

async function init(): Promise<void> {
    if (db) return;
    try {
        client = await clientPromise;
        db = client.db(databaseName);
        generated_courses = db.collection('generated_courses');
    } catch (error) {
        console.error('Database connection error:', error); // Log the error
        throw new Error('Failed to establish connection to database');
    }
}

(async () => {
    await init();
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getGeneratedCourses(): Promise<{ generated_courses?: any[]; error?: string }> {
    try {
        if (!generated_courses) await init();
        
        const result = await generated_courses
            ?.find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray();

        return { generated_courses: result ?? [] };
     } catch (error) {
        console.error('Error fetching generated courses:', error);
        return { error: 'Failed to fetch generated courses!' };
    }
}