import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { configApi } from '../libs/configApi';

const useSocket = (token) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); // To store the socket after initialization

  useEffect(() => {
    if (token) {
      const socketInstance = io(`${configApi.socket}`, {
        auth: { token },
      });
      
      socketRef.current = socketInstance;
      setSocket(socketInstance); // Update the state to make the socket available

      return () => {
        socketInstance.disconnect();
        socketRef.current = null;
        setSocket(null); // Reset the socket state on cleanup
      };
    }
  }, [token]);

  return socket; // Return the socket once it's available
};

export default useSocket;
