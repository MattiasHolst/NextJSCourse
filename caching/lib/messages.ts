import { cache } from "react";
import { unstable_cache } from "next/cache";
import sql from "better-sqlite3";

const db = new sql("messages.db");

export type GetMessage = {
  id: number;
  text: string;
};

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message: string) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export const getMessages = unstable_cache(
  cache(async function getMessages() {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all() as GetMessage[];
  }),
  ["messages"],
  { tags: ["msg"] }
);
