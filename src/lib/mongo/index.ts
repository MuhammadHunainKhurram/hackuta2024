import { MongoClient } from 'mongodb';

const URI: string | undefined = process.env.MONGODB_URI;
const options = {};

if (!URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client: MongoClient = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;
console.log(client)

const globalM = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV !== 'production') {
  if (!globalM._mongoClientPromise) {
      globalM._mongoClientPromise = client.connect();
  }
  clientPromise = globalM._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
