import { useEffect, useState } from "react";

import CommentList from "./comment.list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentDataType } from "@/pages/api/comments/[id]";

interface Props {
  eventId: string;
}

function Comments(props: Props) {
  const [commentData, setCommentData] = useState<CommentDataType[]>();

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if(showComments){
        fetch(`/api/comments/${props.eventId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data is : ", data);
        const responseData = data.comments as CommentDataType[];
        setCommentData(responseData);
      });
    }
  },[showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentDataType) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={commentData} />}
    </section>
  );
}

export default Comments;
