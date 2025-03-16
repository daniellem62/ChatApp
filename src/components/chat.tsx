import { useEffect, useState } from "react";
import socket from "../pages/socket";
import styles from "./Chat.module.css";

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    // Debug connection status
    console.log("Initial connection status:", socket.connected);

    // Connection events
    socket.on("connect", () => {
      console.log("Socket connected!");
      setConnected(true);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnected(false);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
      setConnected(false);
    });

    // Listen for new messages from the server
    socket.on("chat message", (msg: string) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("chat message");
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      console.log("Attempting to send message:", message);
      console.log("Socket connected?", socket.connected);
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Chat App {connected ? "(Connected)" : "(Disconnected)"}</h1>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          className={styles.input}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button className={styles.button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
