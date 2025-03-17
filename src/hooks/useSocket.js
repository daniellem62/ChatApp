import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Get the server URL from environment variable
    const serverUrl =
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:3000";
    console.log("Connecting to socket server at:", serverUrl);

    const newSocket = io(serverUrl, {
      transports: ["websocket", "polling"],
      secure: serverUrl.startsWith("https"),
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket Server");
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket Server");
      setConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setConnected(false);
    });

    newSocket.on("chat message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect(); // Cleanup on unmount
  }, []);

  const sendMessage = (msg) => {
    if (socket && socket.connected) {
      console.log("Sending message:", msg);
      socket.emit("chat message", msg);
      return true;
    } else {
      console.error("Cannot send message: socket not connected");
      return false;
    }
  };

  return { messages, sendMessage, connected };
};
