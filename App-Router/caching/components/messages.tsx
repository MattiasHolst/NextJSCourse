import { GetMessage } from "@/lib/messages";

export default function Messages({ messages } : {messages: GetMessage[]}) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
