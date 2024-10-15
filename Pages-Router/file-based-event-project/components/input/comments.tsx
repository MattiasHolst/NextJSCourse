import { useContext, useEffect, useState } from "react";

import CommentList from "./comment.list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { CommentDataType } from "@/pages/api/comments/[id]";
import NotificationContext from "@/store/notification-context";

interface Props {
  eventId: string;
}

function Comments(props: Props) {
  const [commentData, setCommentData] = useState<CommentDataType[]>();

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const context = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${props.eventId}`)
        .then((response) => response.json())
        .then((data) => {
          const responseData = data.comments as CommentDataType[];
          setCommentData(responseData);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: CommentDataType) {
    context.showNotification({
      title: "Saving comment...",
      message: "Saving comment on event",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() => {
        context.showNotification({
          title: "Success!",
          message: "Sucessfully saved comment!",
          status: "success",
        });
      })
      .catch((error) => {
        context.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && commentData && (
        <CommentList comments={commentData} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
