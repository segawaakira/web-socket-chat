import express from "express";
import { WebSocketServer } from "ws";
import { ChatMessage } from "./types";
import redisClient from "./redisClient";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Chat server is running");
});

const server = app.listen(port, () => {
  console.log(`Web server is running on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send chat history to new client
  redisClient
    .lRange("chat_messages", 0, -1)
    .then((messages: string[]) => {
      messages.forEach((message) => {
        ws.send(message);
      });
    })
    .catch((err: Error) => {
      console.error("Error retrieving messages from Redis", err);
    });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === "typing") {
      // Broadcast typing message to all clients except the sender
      wss.clients.forEach((client) => {
        if (
          client !== ws &&
          client.readyState === ws.OPEN &&
          message.username !== ""
        ) {
          client.send(
            JSON.stringify({ type: "typing", username: message.username })
          );
        }
      });
    } else if (message.type === "message") {
      message.timestamp = Date.now();
      const messageString = JSON.stringify(message);

      // Save message to Redis
      redisClient.rPush("chat_messages", messageString);
      redisClient.lTrim("chat_messages", -100, -1); // Keep only the last 100 messages

      // Broadcast message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(messageString);
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
