import PostsList, { PostData } from "../components/PostsList";
import { Outlet } from "react-router-dom";

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

type PostDataAPI = {
  posts: [
    {
      body: string;
      author: string;
    }
  ];
};

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const resData = await response.json().then((res: PostDataAPI) => {
    return res.posts
  });
  return resData;
}
