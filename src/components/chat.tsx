import { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

interface ChatMessage {
  username: string;
  message: string;
}




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
      const msg: ChatMessage = { username, message: input }; // Make sure the username is included
      sendMessage(msg); // Send the full message object
      setInput(""); // Clear the input after sending
    }
  };

  return (
    <div className="bg-blue-500 p-4 text-white rounded-lg w-200 h-200 mx-auto mt-4 box-shadow text-left space-y-4">
      <h2 className="text-gray-900 text-xl">Chat Hive</h2>
      <div className="flex flex-col overflow-y-auto h-96">
        {/* Make sure to check for valid message data */}
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <p key={index}>
            {/* Ensure you're accessing the properties correctly */}
            <strong>{msg.username}</strong>: {msg.message}
          </p>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>
      <div className="flex items-bottom">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: 5, width: "80%" }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="border border-gray-300 rounded-lg p-2"
      />
      <button onClick={handleSend} style={{ marginLeft: 10, padding: 5 }}>
        Send
      </button>
      </div>
    </div>
  );
};

export default Chat;
