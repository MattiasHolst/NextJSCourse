import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
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
      <NewPost
        onPostTextChange={postTextHandler}
        onAuthorChange={authorChangeHandler}
      />
      <ul className={classes.posts}>
        <Post author={author} body={postText} />
        <Post author="Gandalf" body="Brotherhood" />
      </ul>
    </>
  );
}

export default PostsList;
