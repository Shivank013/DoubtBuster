"use client";

import { useState, useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { SocketContext } from "../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import React from 'react'

const page = () => {
    const dispatch = useDispatch();
  const {roomid} = useSelector( (state) => state.room );
  const {user} = useSelector( (state) => state.profile );
  // const useremail=user.email;

  const {email, setEmail, room, setRoom} = useContext(SocketContext);
  const router = useRouter();
  const socket = useSocket();
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      setEmail(user.email);
      setRoom(roomid);
      console.log(email, room);
      console.log(email, room);

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email,room);
      router.push("/call/room");
    },
    []
  );

  const handleRoomFull = useCallback( async(message) => {
      console.log("Sorry Room Full");
      console.log(message);
    },
    []
  );
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    socket.on("room:full" , handleRoomFull);
    return () => {
      socket.off("room:join", handleJoinRoom);
      socket.off("room:full" , handleRoomFull);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <button type="submit">Join the meeting</button>
       
        
      </form>
    </div>
  );
};

export default page;