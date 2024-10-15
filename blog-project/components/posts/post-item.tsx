import Link from "next/link";
import Image from "next/image";
import classes from "./post-item.module.css";
import { PostDataType } from "@/lib/posts-util";

export default function PostItem({ post }: { post: PostDataType }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  
  const linkPath = `/posts/${post.slug}`;
  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={post.title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{post.title}</h3>
          <time>{formattedDate}</time>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
