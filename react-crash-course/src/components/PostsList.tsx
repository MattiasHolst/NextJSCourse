import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import Modal from "./Modal";

interface PostListProps {
  isPosting: boolean;
  onStopPosting: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}


function PostsList(props: PostListProps) {
  const [postText, setPostText] = useState("Default text");
  const [author, setAuthor] = useState("Mattias");

  function postTextHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  return (
    <>
      {props.isPosting && (
        <Modal onClose={props.onStopPosting}>
          <NewPost
            onPostTextChange={postTextHandler}
            onAuthorChange={authorChangeHandler}
            onCancelPosting={props.onStopPosting}
          />
        </Modal>
      )}

      <ul className={classes.posts}>
        <Post author={author} body={postText} />
        <Post author="Gandalf" body="Brotherhood" />
      </ul>
    </>
  );
}

export default PostsList;
