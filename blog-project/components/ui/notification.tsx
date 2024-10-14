import ReactDOM from "react";
import classes from "./notification.module.css";
import { createPortal } from "react-dom";

interface Props {
  title: string;
  message: string;
  status: string;
}

function Notification(props: Props) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;
  const notificationElement = document.getElementById("notifications");

  if (notificationElement) {
    return createPortal(
      <div className={cssClasses}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>,
      notificationElement
    );
  } else {
    console.error("Notification element not found");
    return null;
  }
}

export default Notification;
