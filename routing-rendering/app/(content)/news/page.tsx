import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";



export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>Next.js News page</h1>
      <NewsList news={news} />
    </>
  );
}
