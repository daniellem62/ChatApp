import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define message interface
interface ChatMessage {
  username: string;
  message: string;
}

// Define hook return type
interface UseSocketReturn {
  messages: ChatMessage[];
  sendMessage: (msg: ChatMessage) => void;
}

export const useSocket = (username?: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const newSocket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || '', {
      secure: true,
      rejectUnauthorized: false, // For self-signed certificates
      transports: ['websocket'], // Try forcing websocket transport
      reconnection: true
    });

    setSocket(newSocket);

    // Emit username once the socket is connected
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket Server");
      if (username) {
        newSocket.emit("set username", username);
      }
    });

    // Listening for incoming messages
    newSocket.on("chat message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [username]); // Reactively depend on username

  // Function to send a message to the server
  const sendMessage = (msg: ChatMessage): void => {
    if (socket) {
      socket.emit("chat message", msg);
    } else {
      console.error("Cannot send message: Socket not connected");
    }
  };

  return { messages, sendMessage };
};
