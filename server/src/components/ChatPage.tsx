import { Message } from ".";

interface Props {
  logs: string[];
  messages: Message[];
  setInputMessage: Function;
  submitMessage: Function;
}

function ChatPage({ logs, messages, setInputMessage, submitMessage }: Props) {
  return (
    <li className="chat page">
      <div className="chatArea">
        <ul className="messages">
          {logs.map((message, i) => {
            return (
              <li className="log" key={message + i}>
                {message}
              </li>
            );
          })}
          {messages.map((message, i) => {
            return (
              <li className="message" key={message.message + i}>
                {message.message}
              </li>
            );
          })}
        </ul>
      </div>
      <input
        className="inputMessage"
        placeholder="Type here..."
        onKeyPress={({ key }) => key === "Enter" && submitMessage()}
        onChange={(e) => setInputMessage(e.target.value)}
      />
    </li>
  );
}

export default ChatPage;
