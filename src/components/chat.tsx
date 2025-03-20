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
    } else {
      setUsername("Anonymous");
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
      const msg: ChatMessage = { username, message: input };
      sendMessage(msg);
      setInput("");
    }
  };

  return (
    <div className="flex p-4 text-white rounded-lg mx-auto mt-4 space-y-4 bg-gradient-to-br from-blue-800 to-gray-800">
      <h2 className="text-gray-200 text-4xl absolute top-0 left-0 right-0 text-center py-4 m-5">
        Chat Hive
      </h2>

      {/* Main content container with flex layout */}
      <div className="flex w-full mt-16 space-x-4">
        {/* Users column - Left side */}
        <div className="w-1/4 bg-[rgba(17,17,17,0.2)] backdrop-blur-md text-white p-4 rounded-lg">

          <h3 className="text-lg font-bold">Online</h3>
          <ul className="mt-2 space-y-2">
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <li key={index} className="text-sm bg-gray-700 p-2 rounded-md">
                  {user}
                </li>
              ))
            ) : (
              <li className="text-sm">No users online</li>
            )}
          </ul>
        </div>

        {/* Messages and input column - Right side */}
        <div className="flex flex-col w-3/4 space-y-4">
          {/* Messages container */}
          <div className="flex flex-col overflow-y-auto h-[60vh] border-gray-800 p-4 rounded-lg bg-[rgba(17,17,17,0.2)] text-left text-white">
            {messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <p key={index} className="py-1">
                  <strong>{msg.username}</strong>: {msg.message}
                </p>
              ))
            ) : (
              <p>No messages yet</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input and button */}
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="border border-gray-300 rounded-lg p-2 flex-grow"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
