"use client";
import React, { useState, useEffect } from "react";
import { useSocket } from "./contexts/SocketProvider";

export const Chat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { timestamp: any; username: any; message: any }[]
  >([]);
  const [typing, setTyping] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "typing") {
        setTyping(message.username);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            timestamp: message.timestamp,
            username: message.username,
            message: message.message,
          },
        ]);
        setTyping(null);
      }
    };

    handleResetTyping();

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "message", username, message }));
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "typing", username }));
    }
  };

  const handleResetTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "typing", username: "" }));
    }
  };

  useEffect(() => {
    if (username !== "" || message !== "") {
      console.log("typing");
      handleTyping();
    }
  }, [username, message]);

  return (
    <div id="chat">
      {typing && <p>{typing} is typing...</p>}
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>
            [{new Date(msg.timestamp).toLocaleTimeString()}] {msg.username}:{" "}
            {msg.message}
          </li>
        ))}
      </ul>
      <input
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        id="message"
        placeholder="Message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
