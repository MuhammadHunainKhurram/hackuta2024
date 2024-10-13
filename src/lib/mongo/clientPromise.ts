import { MongoClient } from 'mongodb';

const URI: string | undefined = process.env.MONGODB_URI;
const options = {};

if (!URI) {
  throw new Error('URI is undefined. Not in .env.local (MONGODB_URI)');
}

const client: MongoClient = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV !== 'production') {
  global._mongoClientPromise = client.connect();
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;