"use server";

import { State } from "@/components/auth-form";
import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import Database from "better-sqlite3";
import { redirect } from "next/navigation";

export async function signup(prevState: State, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  let errors = { email: "", password: "" };

  if (!email?.includes("@")) {
    errors.email = "Please enter a valid email address";
  }

  if (password && password?.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }
  if (!password) {
    errors.password = "Password must be specified";
  }
  if (!email) {
    errors.email = "Email must be specified";
  }
  if (errors.email != "" || errors.password != "") {
    return { errors };
  }

  // store it in the database (create a new user)
  const hashedPassword = hashUserPassword(password as string);
  try {
    const userId = createUser({
      email: email as string,
      password: hashedPassword as string,
    });
    createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error instanceof Database.SqliteError)
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        errors.email = "Email already exists";
        return { errors };
      }
    throw error;
  }
}

export async function login(pevState: State, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  let errors = { email: "", password: "" };

  if (!email) {
    errors.email = "No email provided";
    return { errors };
  }
  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    errors.email =
      "Could not authenticate user, please check your credentials.";
    return { errors };
  }

  if (!password) {
    errors.password = "No password provided";
    return { errors };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    errors.password =
      "Could not authenticate user, please check your credentials.";
    return { errors };
  }

  existingUser.id && createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(
  mode: "login" | "signup",
  prevState: State,
  formData: FormData
) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();

  redirect("/");
}
