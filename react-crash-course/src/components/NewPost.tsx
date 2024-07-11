import { useState } from "react";
import classes from "./NewPost.module.css";
import { PostData } from "./PostsList";

interface NewPostProps {
  onCancelPosting: () => void;
  onAddPost: (postdata: PostData) => void;
}

function NewPost(props: NewPostProps) {
  const [postText, setPostText] = useState("Default text");
  const [author, setAuthor] = useState("Mattias");

  function postTextHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }

  function authorChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const postData = {
      body: postText,
      author: author,
    };
    console.log(postData);
    props.onAddPost(postData);
    props.onCancelPosting();
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={postTextHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={props.onCancelPosting}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
