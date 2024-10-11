import classes from "./posts-grid.module.css";
import PostItem from "./post-item";

export type PostType = {
  title: string;
  image: string;
  date: string;
  excerpt: string;
  slug: string;
};

export default function PostsGrid({ posts }: { posts: PostType[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
