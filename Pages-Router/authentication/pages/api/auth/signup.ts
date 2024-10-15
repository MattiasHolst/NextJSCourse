import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

type SignUpType = {
  email: string;
  password: string;
};

type Data = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = req.body as SignUpType;

    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long",
      });
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "Email already exists" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}
