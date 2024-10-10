import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  message?: string;
};

export type NewsletterPostType = {
  email: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email } = req.body as NewsletterPostType;

    if (!email || email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }

    console.log("Newsletter registered to : ", email);

    res.status(201).json({ message: "Success!" });
  }
}
