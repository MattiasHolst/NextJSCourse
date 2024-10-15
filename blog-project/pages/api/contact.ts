import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

export type ContactType = {
  _id?: ObjectId;
  email: string;
  name: string;
  message: string;
};

type Data = {
  message?: string;
};

export async function connectDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cqxwd.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;
  const client = await MongoClient.connect(connectionString);

  return client;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const test = req.body;
    const { email, name, message } = req.body as ContactType;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    } as ContactType;
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Could not connect to Database" });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed" });
    }

    client.close();

    res.status(201).json({ message: "Successfully stored message" });
  }
}
