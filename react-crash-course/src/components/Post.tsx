import { Link } from "react-router-dom";
import classes from "./Post.module.css";

interface PostProps {
  author: string;
  body:string;
  id: string;
}

function Post(props: PostProps) {
  return (
    <li className={classes.post}>
      <Link to={props.id}>
  
      <p className={classes.author}>{props.author}</p>
      <p className={classes.text}>{props.body}</p>
      </Link>
    </li>
  );
}

export default Post;
