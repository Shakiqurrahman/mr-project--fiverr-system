import { io } from 'socket.io-client';

let socket;

const connectSocket = (url, token) => {
  if (!socket && token) {
    // Pass token in the auth option when connecting
    socket = io(url, {
      auth: { token },
    });
  }
  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Reset socket to null on disconnection
  }
};

export { connectSocket, disconnectSocket };
