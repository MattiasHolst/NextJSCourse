import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function InterceptedImagePage({
  params,
}: {
  params: { newsId: string };
}) {
  const newsItem = await getNewsItem(params.newsId);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img
            width="100%"
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
          />
        </div>
      </dialog>
    </>
  );
}
