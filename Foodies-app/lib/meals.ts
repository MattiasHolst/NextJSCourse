import { MealItem } from "@/components/meals/meals-grid";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const meals = db.prepare("SELECT * from meals").all() as MealItem[];

  return meals;
}

export function getMeal(mealId: string) {
  return db
    .prepare("SELECT * from meals where slug = ?")
    .get(mealId) as MealItem;
}

export async function saveMeal(meal: MealItem) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  meal.path = `/images/${fileName}`;

  db.prepare(
    `
  INSERT INTO meals
    (title, summary, instructions, creator, creator_email, slug, path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    meal.title,
    meal.summary,
    meal.instructions,
    meal.creator,
    meal.creator_email,
    meal.slug,
    meal.path,
  );
}
