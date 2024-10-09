import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  message: string;
  feedback?: FeedbackPostType;
};

type FeedbackPostType = {
  id?: string;
  email: string;
  text: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, text } = req.body as FeedbackPostType;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "This works!" });
  }
}
