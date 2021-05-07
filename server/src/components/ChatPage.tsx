import { useRef, useEffect } from "react";
import { Message } from ".";

const COLORS = [
  "#e21400",
  "#91580f",
  "#f8a700",
  "#f78b00",
  "#58dc00",
  "#287b00",
  "#a8f07a",
  "#4ae8c4",
  "#3b88eb",
  "#3824aa",
  "#a700ff",
  "#d300e7",
];

// Gets the color of a username through our hash function
function getUsernameColor(username: string) {
  // Compute hash code
  var hash = 7;
  for (var i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash;
  }
  // Calculate color
  var index = Math.abs(hash % COLORS.length);
  return COLORS[index];
}

interface Props {
  logs: string[];
  messages: Message[];
  submitMessage: Function;
}

function ChatPage({ logs, messages, submitMessage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => inputRef?.current?.focus();

  // Focus the inputMessage input on mount
  useEffect(() => focusInput(), []);

  // Detect when the client submits a message using the ENTER key
  const onKeyPress = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputRef!.current!.value === "") return;
    if (key === "Enter") {
      submitMessage(inputRef!.current!.value);
      inputRef!.current!.value = "";
    }
  };

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
                <span
                  className="username"
                  style={{ color: getUsernameColor(message.username) }}
                >
                  {message.username}
                </span>
                <span className="messageBody"> {message.message} </span>
              </li>
            );
          })}
        </ul>
      </div>
      <input
        ref={inputRef}
        className="inputMessage"
        placeholder="Type here..."
        onKeyPress={onKeyPress}
      />
    </li>
  );
}

export default ChatPage;
