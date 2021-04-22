import { useRef, useEffect } from "react";
import { Message } from ".";

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
                {message.message}
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
