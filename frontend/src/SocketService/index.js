import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect(`${process.env.REACT_APP_SERVER_API}`, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "header"
      }
  });
export const SocketContext = React.createContext();
