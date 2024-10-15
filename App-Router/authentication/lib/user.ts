import db, { User } from "./db";

export function createUser(user: User) {
  const result = db
    .prepare("INSERT INTO users (email,password) VALUES (?, ?)")
    .run(user.email, user.password);

  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as User;
}
