import { useState } from "react";
import {
  buildFeedbackPath,
  extractFeedback,
  FeedbackGetType,
  FeedbackPostType,
} from "../api/feedback";

export default function FeedbackPage(props: FeedbackGetType) {
  const [feedbackData, setFeedbackData] = useState<FeedbackPostType>();
  function loadFeedbackItemHandler(id?: string) {
    if (!id) {
      return;
    }
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const feedbackData = data.feedback as FeedbackPostType;
        setFeedbackData(feedbackData);
      });
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedback.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackItemHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return { props: { feedback: data } };
}
