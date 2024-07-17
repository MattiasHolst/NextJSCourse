import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import Modal from "./Modal";
import { useEffect, useState } from "react";

interface PostListProps {
  isPosting: boolean;
  onStopPosting: () => void;
}

export type PostData = {
  body: string;
  author: string;
};

function PostsList(props: PostListProps) {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData: PostData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts: PostData[]) => [postData, ...existingPosts]);
  }

  return (
    <>
      {props.isPosting && (
        <Modal onClose={props.onStopPosting}>
          <NewPost
            onCancelPosting={props.onStopPosting}
            onAddPost={addPostHandler}
          />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, i) => (
            <Post key={i} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
