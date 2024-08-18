"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketContext = createContext<WebSocket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
