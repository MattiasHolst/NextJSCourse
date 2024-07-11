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
    setPosts((existingPosts: PostData[]) =>  [postData, ...existingPosts]);
  }

  console.log('posts : ', posts);

  return (
    <>
      {props.isPosting && (
        <Modal onClose={props.onStopPosting}>
          <NewPost onCancelPosting={props.onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}

      <ul className={classes.posts}>
        <Post author="Gandalf" body="Brotherhood" />
      </ul>
    </>
  );
}

export default PostsList;
