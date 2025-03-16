import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app); // Use http.Server for Express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // This should match your frontend port
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to the Chat App!");
});

// Listen for socket connections
io.on("connection", (socket) => {
  console.log("A user connected. Socket ID:", socket.id);

  // Handle incoming messages
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast the message to all clients
  });

  // Handle incoming chat messages
  socket.on("chat message", (msg) => {
    console.log(`Message received from ${socket.id}:`, msg);
    io.emit("chat message", msg); // Broadcast the message to all clients
    console.log("Message broadcast to all clients");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
