import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://34.220.153.237:3000"; // Replace with your EC2 instance IP

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, { transports: ["websocket", "polling"] });
    
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket Server");
    });

    newSocket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect(); // Cleanup on unmount
  }, []);

  const sendMessage = (msg) => {
    if (socket) {
      socket.emit("chat message", msg);
    }
  };

  return { messages, sendMessage };
};
