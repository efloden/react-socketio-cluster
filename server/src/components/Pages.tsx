import { useState, useEffect, useCallback } from "react";
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import { Socket } from "socket.io-client";
import { Message, Login } from ".";

interface Props {
  socket: Socket;
}

function Pages({ socket }: Props) {
  const [username, setUsername] = useState("");
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
  const submitUsername = (username: string) => {
    socket.emit("add user", username);
    setUsername(username);
  };

  // When the client submits a message using the ENTER key
  const submitMessage = (inputMessage: string) => {
    socket.emit("new message", inputMessage);
    addMessage({
      username: username,
      message: inputMessage,
    });
  };

  useEffect(() => {
    // Whenever the server emits 'login', log the login message
    socket.on("login", (data: Login) => {
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
        {username ? (
          <ChatPage
            logs={logs}
            messages={messages}
            submitMessage={submitMessage}
          />
        ) : (
          <LoginPage submitUsername={submitUsername} />
        )}
      </ul>
    </div>
  );
}

export default Pages;
