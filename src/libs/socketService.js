import { io } from 'socket.io-client';

let socket;

const connectSocket = (url) => {
  if (!socket) {
    socket = io(url);
  }
  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { connectSocket, disconnectSocket };
