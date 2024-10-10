import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

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

    const client = await MongoClient.connect(
      "mongodb+srv://holstmattias:mZ8cZNgL4gR2xwqW@cluster0.cqxwd.mongodb.net?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email: email });

    client.close();

    res.status(201).json({ message: "Success!" });
  }
}
