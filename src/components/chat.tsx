import { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";




const Chat = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const { messages, sendMessage } = useSocket(username);


  // Prompt for username only once on mount
  useEffect(() => {
    const user = prompt("Enter your username:");
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    console.log("Messages in state:", messages);
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ message: input }); // Make sure message is a string
      setInput("");
    }
  };

  return (
    <div className="bg-blue-500 p-4 text-white rounded-lg w-96 mx-auto mt-4 box-shadow text-center space-y-4">
      <h2 className="text-gray-900 text-xl">Chat Hive</h2>
      <div style={{ border: "1px solid #ddd", padding: 10, minHeight: 200 }}>
        {/* Make sure to check for valid message data */}
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index}>
            {/* Ensure you're accessing the properties correctly */}
            <strong>{username}</strong>: {JSON.stringify(msg.message)}
          </p>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: 5, width: "80%" }}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend} style={{ marginLeft: 10, padding: 5 }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
