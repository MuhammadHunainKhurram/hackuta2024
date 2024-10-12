import { MongoClient } from 'mongodb';

const URI: string | undefined = process.env.MONGODB_URI;
const options = {};

if (!URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client: MongoClient = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;
console.log(client)
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
  console.log(client)
} else {
  clientPromise = client.connect();
}

export default clientPromise;
