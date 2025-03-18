import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const Chat = () => {
  const { messages, sendMessage } = useSocket();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", textAlign: "center" }}>
      <h2>Chat Hive</h2>
      <div style={{ border: "1px solid #ddd", padding: 10, minHeight: 200 }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: 5, width: "80%" }}
      />
      <button onClick={handleSend} style={{ marginLeft: 10, padding: 5 }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
