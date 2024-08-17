"use client";
import React, { useState, useEffect } from "react";
import { useSocket } from "./contexts/SocketProvider";
import { Login } from "./login";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export const Chat = () => {
  const [name, setName] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { timestamp: any; username: any; message: any }[]
  >([]);
  const [typing, setTyping] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    setName(getCookie("name"));
  }, []);
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      if (message.type === "typing") {
        setTyping(message.name);
        setTimeout(() => {
          setTyping(null);
        }, 1000);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            timestamp: message.timestamp,
            username: message.name,
            message: message.message,
          },
        ]);
        setTyping(null);
      }
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "message", name, message }));
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "typing", name }));
    }
  };

  useEffect(() => {
    handleTyping();
  }, [message]);
  return !name ? (
    <Login />
  ) : (
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
