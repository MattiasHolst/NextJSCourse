import { useState } from "react";
import classes from "./NewPost.module.css";

function NewPost() {
  const [postText, setPostText] = useState("");
  function changeBodyHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(event.target.value);
  }
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      <p>{postText}</p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required />
      </p>
    </form>
  );
}

export default NewPost;
