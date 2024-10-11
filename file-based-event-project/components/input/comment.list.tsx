import classes from "./comment-list.module.css";
import { CommentDataType } from "@/pages/api/comments/[id]";

interface Props {
  comments: CommentDataType[] | undefined;
}

function CommentList(props: Props) {
  if (!props.comments) {
    return;
  }
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
