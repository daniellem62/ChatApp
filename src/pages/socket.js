import { io } from "socket.io-client";

// Connect to the backend Socket.IO server
const socket = io("http://localhost:3001"); // Ensure the correct backend URL

// Don't set up event listeners here
// Let components handle their own event listening

export default socket;
