// SocketContext.js
import React, { useCallback, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/SocketContext';
import io from 'socket.io-client';


let socket;

const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);

  // Connect socket
  const connectSocket = useCallback(() => {
    if (!socket || !socket.connected) {
      socket = io('http://localhost:3000');
      setSocketInstance(socket);
      console.log('Socket connected');
    }
  }, []);


  // Disconnect socket
  const disconnectSocket = useCallback(() => {
    if (socket && socket.connected) {
      socket.disconnect();
      console.log('Socket disconnected');
    }
  }, []);


  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id && !socket) {
      connectSocket();
      // Emit any necessary events after reconnecting
      emitEvent('connectGroup', user_id);
    }
    
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  // Example of a generic method for emitting events
  const emitEvent = (event, ...args) => {
    if (socket) {
      socket.emit(event, ...args);
    }
  };
  

  // Example of a generic method for listening to events
  const onEvent = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const offEvent = (event, callback) => {
    if (socket) {
        socket.off(event, callback);
    }
  };



  return (
    <SocketContext.Provider value={{ socket: socketInstance, connectSocket, disconnectSocket, emitEvent, onEvent, offEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;