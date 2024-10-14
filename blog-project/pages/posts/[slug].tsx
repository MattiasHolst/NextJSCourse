import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles, PostDataType } from "@/lib/posts-util";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

interface Props {
  post: PostDataType;
}

export default function PostDetailPage(props: Props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />;
    </>
  );
}

export function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  if (!params || typeof params.slug !== "string") {
    throw new Error("Slug is not defined or not a string");
  }
  const postData = getPostData(params.slug);

  return { props: { post: postData }, revalidate: 600 };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
