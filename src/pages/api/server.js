import { Server } from 'socket.io';

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket.IO server already running');
    return res.end();
  }

  const io = new Server(res.socket.server); // Attach Socket.IO to the Next.js server

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Handle incoming messages
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message', msg); // Broadcast the message to all clients
    });

    socket.on('chat message', (msg) => {
      console.log(`Message received from ${socket.id}:`, msg);
      io.emit('chat message', msg); // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  res.socket.server.io = io; // Store the instance on the socket server for future requests

  console.log('Socket.IO server initialized');
  res.end();
}
