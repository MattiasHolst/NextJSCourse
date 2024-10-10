import fs from "fs";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Data = {
  message?: string;
  comments?: CommentDataType[];
};

export type CommentDataType = {
  id?: string;
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

  const client = await MongoClient.connect(
    "mongodb+srv://holstmattias:mZ8cZNgL4gR2xwqW@cluster0.cqxwd.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0"
  );

  if (req.method === "POST") {
    const commentData = req.body as CommentDataType;

    if (!commentData.email || !commentData.email.includes("@")) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }
    if (!commentData.name) {
      res.status(422).json({ message: "Name not specified" });
      return;
    }
    if (!commentData.text) {
      res.status(422).json({ message: "Text not specified" });
      return;
    }
    if (!eventId) {
      res.status(422).json({ message: "Eventid not sepcified" });
      return;
    }

    console.log("Comment : ", commentData, " saved to event id : ", eventId);

    const newComment = {
      id: "",
      email: commentData.email,
      name: commentData.name,
      text: commentData.text,
      eventId: eventId as string,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId.toString();

    res.status(201).json({ message: "Success!", comments: [newComment] });
  }
  if (req.method === "GET") {
    console.log("get comments for event : ", eventId);
    const dummyComments = [
      {
        id: "c1",
        name: "Gandalf",
        email: "test@test.se",
        text: "Gandalf is cool",
      },
      {
        id: "c1",
        name: "Aragorn",
        email: "test2@test.se",
        text: "Hello Gandalf",
      },
    ];

    res.status(200).json({
      message: "Success!",
      comments: dummyComments,
    });
  }

  client.close();
}
