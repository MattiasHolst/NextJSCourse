import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import Modal from "./Modal";
import { useState } from "react";

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

  function addPostHandler(postData: PostData) {
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
