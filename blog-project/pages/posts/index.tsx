import AllPosts from "@/components/posts/all-posts";
import { getAllPosts, PostDataType } from "@/lib/posts-util";

export default function AllPostsPage({ posts }: { posts: PostDataType[] }) {
  return <AllPosts posts={posts} />;
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
