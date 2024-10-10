import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  message?: string;
  feedback?: FeedbackPostType;
};

export type FeedbackPostType = {
  id?: string;
  email: string;
  text: string;
};

export type FeedbackGetType = {
  feedback: FeedbackPostType[];
};

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  const fileContent = fileData.toString();

  let data;
  if (fileContent) {
    data = JSON.parse(fileContent);
  } else {
    data = []; // or any default value you prefer
  }
  return data;
}

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
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
