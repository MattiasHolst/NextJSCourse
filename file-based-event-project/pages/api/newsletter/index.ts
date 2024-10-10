import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message?: string;
};

export type NewsletterPostType = {
  email: string;
};

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://holstmattias:mZ8cZNgL4gR2xwqW@cluster0.cqxwd.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}

async function insertDocument(
  client: MongoClient,
  document: { email: string }
) {
  const db = client.db();
  await db.collection("newsletter").insertOne(document);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email } = req.body as NewsletterPostType;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      await insertDocument(client, { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Success!" });
  }
}
