import { useState, useEffect, useCallback } from "react";
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import { Socket } from "socket.io-client";
import { Message, Login } from ".";

interface Props {
  socket: Socket;
}

function Pages({ socket }: Props) {
  const [hasUsername, setHasUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // Log a message
  const log = useCallback(
    (message) => {
      setLogs([...logs, message]);
    },
    [logs]
  );

  // Recieves a chat message
  const addMessage = useCallback(
    (message) => {
      setMessages([...messages, message]);
    },
    [messages]
  );

  // When the client submits a username using the ENTER key
  const submitUsername = () => {
    if (username.length === 0) return;
    socket.emit("add user", username);
    setHasUsername(true);
  };

  // When the client submits a message using the ENTER key
  const submitMessage = () => {
    if (inputMessage.length === 0) return;
    socket.emit("new message", inputMessage);
    addMessage({
      username: username,
      message: inputMessage,
    });
  };

  useEffect(() => {
    console.log({ socket });
    // Whenever the server emits 'login', log the login message
    socket.on("login", (data: Login) => {
      console.log("login");
      let message = "Welcome to Socket.IO Chat – ";
      if (data.numUsers === 1) {
        message += "there's 1 participant";
      } else {
        message += "there are " + data.numUsers + " participants";
      }
      log(message);
    });
    // Whenever the server emits 'new message', update the chat body
    socket.on("new message", function (message: Message) {
      console.log("new message");
      addMessage(message);
    });
    // Remove event listeners on cleanup
    return () => {
      socket.off("login");
      socket.off("new message");
    };
  }, [socket]);

  return (
    <div id="App">
      <ul className="pages">
        {hasUsername ? (
          <ChatPage
            logs={logs}
            messages={messages}
            setInputMessage={setInputMessage}
            submitMessage={submitMessage}
          />
        ) : (
          <LoginPage
            submitUsername={submitUsername}
            setUsername={setUsername}
          />
        )}
      </ul>
    </div>
  );
}

export default Pages;
