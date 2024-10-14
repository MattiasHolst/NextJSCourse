import AllPosts from "@/components/posts/all-posts";
import { getAllPosts, PostDataType } from "@/lib/posts-util";
import Head from "next/head";

export default function AllPostsPage({ posts }: { posts: PostDataType[] }) {
  return (
    <>
      <Head>
        <title>All my posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
