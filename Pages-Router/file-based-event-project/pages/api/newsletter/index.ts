import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "@/helpers/db-util";

type Data = {
  message?: string;
};

export type NewsletterPostType = {
  email: string;
};

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
      await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Success!" });
  }
}
