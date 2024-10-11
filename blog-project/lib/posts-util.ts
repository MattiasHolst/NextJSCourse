import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export type postDataType = {
  title: string;
  slug: string;
  content: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
};

function getPostData(fileName: string) {
  const filePath = path.join(postDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); //removes the file extension

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  } as postDataType;

  return postData;
}

function getAllPosts() {
  const postFiles = fs.readdirSync(postDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
