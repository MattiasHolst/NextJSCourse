import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts, PostDataType } from "@/lib/posts-util";

interface Props {
  posts: PostDataType[];
}

export default function HomePage(props: Props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts,
    },
  };
}
