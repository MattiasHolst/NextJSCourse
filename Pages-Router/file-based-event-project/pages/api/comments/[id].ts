import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  comments?: CommentDataType[];
};

export type CommentDataType = {
  _id?: string;
  email: string;
  name: string;
  text: string;
  eventId?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const eventId = req.query.id;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the db failed" });
    return;
  }

  if (req.method === "POST") {
    const commentData = req.body as CommentDataType;

    if (!commentData.email || !commentData.email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      client.close();
      return;
    }
    if (!commentData.name) {
      res.status(422).json({ message: "Name not specified" });
      client.close();
      return;
    }
    if (!commentData.text) {
      res.status(422).json({ message: "Text not specified" });
      client.close();
      return;
    }
    if (!eventId) {
      res.status(422).json({ message: "Eventid not sepcified" });
      client.close();
      return;
    }

    const newComment = {
      _id: "",
      email: commentData.email,
      name: commentData.name,
      text: commentData.text,
      eventId: eventId as string,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);

      newComment._id = result.insertedId.toString();

      res.status(201).json({ message: "Success!", comments: [newComment] });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      const comments = documents.map(
        (doc) =>
          ({
            _id: doc._id?.toString(),
            email: doc.email,
            name: doc.name,
            text: doc.text,
            eventId: doc.eventId,
          } as CommentDataType)
      );

      res.status(200).json({
        message: "Success!",
        comments: comments,
      });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close();
}
