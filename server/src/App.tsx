import React from "react";
import io, { Socket } from "socket.io-client";
import Pages from "./components/Pages";

const ENDPOINT = "http://localhost:3000";

function App() {
  const socket: Socket = io(ENDPOINT);
  return (
    <div id="app">
      <Pages socket={socket} />
    </div>
  );
}

export default App;
