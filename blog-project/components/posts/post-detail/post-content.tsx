import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import { PostDataType } from "@/lib/posts-util";

function PostContent({ post }: { post: PostDataType }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p({ ...props }) {
      const { node } = props;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{props.children}</p>;
    },

    code({ ...props }) {
      const { className, children } = props;
      const language = className.split("-")[1];
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} imageUrl={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
