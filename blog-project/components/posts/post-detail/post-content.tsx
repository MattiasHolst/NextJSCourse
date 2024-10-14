import ReactMarkdown, { Components } from "react-markdown";
import React from "react";
import Image from "next/image";
import { Element, ElementContent, Text } from "hast";
import { PostDataType } from "@/lib/posts-util";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";

type MarkdownImage = {
  type: string;
  tagName: string;
  properties: {
    src: string;
    alt: string;
  };
};

export default function PostContent({ post }: { post: PostDataType }) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  function isMarkdownImage(element: any): element is MarkdownImage {
    return (
      element.type === "element" &&
      element.tagName === "img" &&
      element.properties &&
      typeof element.properties.src === "string"
    );
  }

  const customComponent: Partial<Components> = {
    p({ node, ...props }) {
      if (!node) {
        return <p></p>;
      }

      const renderNode = (
        node: ElementContent,
        index: number
      ): React.ReactNode => {
        if (node.type === "text") {
          return (
            <React.Fragment key={index}>{(node as Text).value}</React.Fragment>
          );
        } else if (node.type === "element") {
          const element = node as Element;
          const children = element.children.map(renderNode);

          if (element.tagName === "img") {
            const { src, alt } = element.properties as {
              src: string;
              alt: string;
            };
            return (
              <div className={classes.image}>
                <Image
                  key={index}
                  src={`/images/posts/${post.slug}/${src}`}
                  alt={alt}
                  width={500}
                  height={300}
                />
              </div>
            );
          }

          return React.createElement(
            element.tagName,
            { ...element.properties, key: index },
            ...children
          );
        }
        return null;
      };

      const containsImage = node.children.some((child) =>
        isMarkdownImage(child)
      );

      if (containsImage) {
        return (
          <>{node.children.map((child, index) => renderNode(child, index))}</>
        );
      }

      return (
        <p>{node.children.map((child, index) => renderNode(child, index))}</p>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} imageUrl={imagePath} />
      <ReactMarkdown components={customComponent}>{post.content}</ReactMarkdown>
    </article>
  );
}
