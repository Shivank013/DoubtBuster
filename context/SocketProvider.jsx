"use client";

import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
export const SocketContext = createContext(null);

export const useSocket = () => {
  const {socket} = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:7000"), []);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [boarddata, setBoarddata] = useState("");
  const [codedata, setCodedata] = useState("");
  const [language, setLanguage] = useState("c");

  const value ={
    socket,
    room, setRoom,
    email, setEmail,
    boarddata, setBoarddata,
    codedata, setCodedata,
    language, setLanguage
  }
  
  return (
    <SocketContext.Provider 
    value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
