import { MongoClient, Sort } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://holstmattias:mZ8cZNgL4gR2xwqW@cluster0.cqxwd.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: {}
) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter = {}
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
