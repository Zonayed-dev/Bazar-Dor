
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const options = {};

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

const client =
  globalWithMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalWithMongo._mongoClient = client;
}

export const db = client.db(
  process.env.MONGODB_DB || "bazardor"
);

export default client;
