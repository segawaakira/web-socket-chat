"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const redisClient_1 = __importDefault(require("./redisClient"));
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
  res.send("Chat server is running");
});
const server = app.listen(port, () => {
  console.log(`Web server is running on http://localhost:${port}`);
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
  console.log("Client connected");
  // Send chat history to new client
  redisClient_1.default
    .lRange("chat_messages", 0, -1)
    .then((messages) => {
      messages.forEach((message) => {
        ws.send(message);
      });
    })
    .catch((err) => {
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
          message.name !== ""
        ) {
          client.send(JSON.stringify({ type: "typing", name: message.name }));
        }
      });
    } else if (message.type === "message") {
      message.timestamp = Date.now();
      const messageString = JSON.stringify(message);
      // Save message to Redis
      redisClient_1.default.rPush("chat_messages", messageString);
      redisClient_1.default.lTrim("chat_messages", -100, -1); // Keep only the last 100 messages
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
