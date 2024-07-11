import { ChangeEventHandler } from "react";
import classes from "./NewPost.module.css";

interface NewPostProps {
  onPostTextChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onAuthorChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

function NewPost(props: NewPostProps) {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          required
          rows={3}
          onChange={props.onPostTextChange}
        />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={props.onAuthorChange} />
      </p>
    </form>
  );
}

export default NewPost;
