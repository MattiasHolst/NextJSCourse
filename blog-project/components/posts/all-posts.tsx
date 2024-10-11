import classes from "./all-posts.module.css";
import PostsGrid, { PostType } from "./posts-grid";

export default function AllPosts({ posts }: { posts: PostType[] }) {
  return (
    <section className={classes.posts}>
      <h1>All posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
