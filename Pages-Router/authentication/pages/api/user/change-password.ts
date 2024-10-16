import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import Nextauth, { authOptions } from "../auth/[...nextauth]";
import { NextAuthOptions } from "next-auth";

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  );

  console.log("session is : ", session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user?.email;
  const { oldPassword, newPassword } = req.body as ChangePasswordType;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const getUser = await usersCollection.findOne({ email: userEmail });

  if (!getUser) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const userPassword = getUser.password;

  const isEqual = await verifyPassword(oldPassword, userPassword);

  if (!isEqual) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}
