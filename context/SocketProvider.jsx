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
  const socket = useMemo(() => io("https://doubt-buster-backend-fc8c41666700.herokuapp.com"), []);
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [boarddata, setBoarddata] = useState("");
  const [codedata, setCodedata] = useState("");
  const [language, setLanguage] = useState("c");
  const [callendflag, setcallendflag] = useState("false");
  const [remoteEmail, setremoteEmail] = useState("");

  const value ={
    socket,
    room, setRoom,
    email, setEmail,
    boarddata, setBoarddata,
    codedata, setCodedata,
    language, setLanguage,
    callendflag, setcallendflag,
    remoteEmail, setremoteEmail
  }
  
  return (
    <SocketContext.Provider 
    value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};