import classes from "./Post.module.css";

interface PostProps {
  author: string;
  body:string;
}

function Post(props: PostProps) {
  return (
    <li className={classes.post}>
      <p className={classes.author}>{props.author}</p>
      <p className={classes.text}>{props.body}</p>
    </li>
  );
}

export default Post;
