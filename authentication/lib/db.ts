import sql from "better-sqlite3";

interface CountResult {
  count: number;
}

export type User = {
  id?: number;
  email: string;
  password: string;
};

export type Session = {
  id: string;
  expires_at: number;
  user_id: string;
};

export type Training = {
  id: number;
  title: string;
  image: string;
  description: string;
};

const db = sql("training.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS trainings (
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    description TEXT
  );
`);

const result = db
  .prepare("SELECT COUNT(*) as count FROM trainings")
  .get() as CountResult;

const hasTrainings = result.count > 0;

if (!hasTrainings) {
  db.exec(`
    INSERT INTO trainings (title, image, description)
    VALUES
    ('Yoga', '/yoga.jpg', 'A gentle way to improve flexibility and balance.'),
    ('Boxing', '/boxing.jpg', 'A high-energy workout that improves strength and speed.'),
    ('Running', '/running.jpg', 'A great way to improve cardiovascular health and endurance.'),
    ('Weightlifting', '/weightlifting.jpg', 'A strength-building workout that helps tone muscles.'),
    ('Cycling', '/cycling.jpg', 'A low-impact workout that improves cardiovascular health and endurance.'),
    ('Gaming', '/gaming.jpg', 'A fun way to improve hand-eye coordination and reflexes.'),
    ('Sailing', '/sailing.jpg', 'A relaxing way to enjoy the outdoors and improve balance.');
`);
}

export default db;
