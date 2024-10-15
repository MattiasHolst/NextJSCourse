import sql from "better-sqlite3";

export type NewsType = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

interface MonthResult {
  month: string;
}

interface YearResult {
  year: string;
}

const db = sql("data.db");

export async function getAllNews() {
  const news = db.prepare("SELECT * FROM news").all() as NewsType[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(newsId: string) {
  const newsItem = db
    .prepare("SELECT * FROM news WHERE slug = ?")
    .get(newsId) as NewsType;
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as NewsType[];
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all() as YearResult[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years.map((year) => year.year);
}

export function getAvailableNewsMonths(year: string) {
  const results = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year) as MonthResult[];
  return results.map((month) => month.month);
}

export async function getNewsForYear(year: string) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year) as NewsType[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(year: string, month: string) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month) as NewsType[];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}
