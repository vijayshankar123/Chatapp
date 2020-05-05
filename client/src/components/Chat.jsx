import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [roomdata, setRoomData] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = `http://localhost:8080`;

  useEffect(
    () => {
      const { name } = queryString.parse(location.search);

      socket = io(ENDPOINT);

      setName(name);
      //setRoom(room);
      socket.emit("join", { name }, room => {
        setRoom(room);
      });

      console.log(socket);
      socket.on("roomData", data => {
        setRoomData([data.users]);
      });

      return () => {
        socket.emit("disconnect");
        socket.off();
      };
    },
    [ENDPOINT, location.search]
  );
  useEffect(
    () => {
      socket.on("message", message => {
        setMessages([...messages, message]);
      });
    },
    [messages]
  );

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  console.log("message", message);
  console.log("messages", messages);
  console.log("room", roomdata);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} roomdata={roomdata} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />

        {/*   <input
          type="text"
          value={message}
          placeholder="Type your Message here"
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
        /> */}
      </div>
    </div>
  );
};
export default Chat;
