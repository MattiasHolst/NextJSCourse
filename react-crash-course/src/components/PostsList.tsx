import { useState } from "react";
import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";
import Modal from "./Modal";

function PostsList() {
  const [modalOpen, setModalOpen] = useState(true);
  const [postText, setPostText] = useState("Default text");
  const [author, setAuthor] = useState("Mattias");

  function hideModalHandler() {
    setModalOpen(false);
  }

  function postTextHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  return (
    <>
      {modalOpen && (
        <Modal onClose={hideModalHandler}>
          <NewPost
            onPostTextChange={postTextHandler}
            onAuthorChange={authorChangeHandler}
          />
        </Modal>
      ) }

      <ul className={classes.posts}>
        <Post author={author} body={postText} />
        <Post author="Gandalf" body="Brotherhood" />
      </ul>
    </>
  );
}

export default PostsList;
