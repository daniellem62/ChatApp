import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";

interface ChatMessage {
  username: string;
  message: string;
}




const Chat = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const { messages, sendMessage, users } = useSocket(username);

  


  // Prompt for username only once on mount
  useEffect(() => {
    const user = prompt("Enter your username:");
    if (user) {
      setUsername(user);
    }
  }, []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="p-4 text-white rounded-lg w-300 h-200 mx-auto mt-4 text-center space-y-4 bg-gradient-to-br from-blue-800 to-gray-800">
      <h2 className="text-gray-200 text-4xl">Chat Hive</h2>
      <div className="w-1/4 bg-gray-900 text-white p-4 rounded-l-lg">
        <h3 className="text-lg font-bold">Online</h3>
        <ul className="mt-2 space-y-2">
          {users.map((users, index) => (
            <li key={index} className="text-sm bg-gray-700 p-2 rounded-md">
              {users}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col overflow-y-auto h-[80%] border-gray-800 border-4 p-4 rounded-lg shadow-2xl bg-gray-100 shadow-inner text-left text-black">
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
           <div ref={messagesEndRef} />
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
