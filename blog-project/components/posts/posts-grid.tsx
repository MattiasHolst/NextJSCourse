import classes from "./posts-grid.module.css";
import PostItem from "./post-item";
import { PostDataType } from "@/lib/posts-util";

export default function PostsGrid({ posts }: { posts: PostDataType[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
