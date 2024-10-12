import clientPromise from '.';
import { Db, Collection, Document, MongoClient } from 'mongodb';

let client: MongoClient | undefined;
let db: Db | undefined;
let generated_courses: Collection<Document> | undefined;

async function init(): Promise<void> {
    if (db) return;
    try {
        client = await clientPromise;
        db = client.db("HackUTA2024");
        generated_courses = db.collection('generated_courses');
        console.log(client)
    } catch (error) {
        throw new Error('Failed to establish connection to database');
    }
}

(async () => {
    await init();
})();

/////////////////////////
/// GENERATED COURSES ///
/////////////////////////

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
        return { error: 'Failed to fetch generated courses!' };
    }
}
