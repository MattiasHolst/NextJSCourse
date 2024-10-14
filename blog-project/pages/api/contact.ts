import { NextApiRequest, NextApiResponse } from "next";

type ContactType = {
  email: string;
  name: string;
  message: string;
};

type Data = {
  message?: string;
};

export default function handler(
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
    };

    console.log(newMessage);

    res.status(201).json({ message: "Successfully stored message" });
  }
}
