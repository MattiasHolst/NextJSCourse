import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { buildFeedbackPath, extractFeedback } from "./feedback";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath) as FeedbackPostType[];
  const feedbackItem = data.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ feedback: feedbackItem });
}
