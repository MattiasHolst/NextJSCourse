import { FormEvent, useState } from "react";
import {
  buildFeedbackPath,
  extractFeedback,
  FeedbackGetType,
  FeedbackPostType,
} from "./api/feedback";

export default function FeedbackPage(props: FeedbackGetType) {
  return (
    <div>
      <ul>
        {props.feedback.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return { props: { feedback: data } };
}
