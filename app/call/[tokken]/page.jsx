"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import jwt from 'jsonwebtoken';
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from "../../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import React from 'react'


const page = () => {


  const {email, setEmail, room, setRoom} = useContext(SocketContext);
  const router = useRouter();
  const {tokken}=useParams();
  // const url=useParams();
  const socket = useSocket();
  const route=useRouter();
  // let flag = 5
  useEffect(()=>{
    const token = localStorage.getItem('token');
    // let flag=  localStorage.getItem('flag');
  if (!token ) {
 
    const url=  `/call/${tokken}`;
    localStorage.setItem('redirectPath', url);
    const ans=localStorage.getItem('redirectPath');
    console.log(ans);
  
    route.push("/login");
    
 
  }



  },[])

  // console.log(tokken);
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email,room);
      router.push("/call/room");
      let rem= localStorage.getItem('redirectPath');
      if(rem){
      localStorage.removeItem('redirectPath'); 
      }
      let pqr= localStorage.getItem('flag');
      if(pqr){
      localStorage.removeItem('flag'); 
      }
    },
    []
  );

  const handleRoomFull = useCallback( async(message) => {
      console.log("Sorry Room Full");
      console.log(message);
    },
    []
  );
  // email: email,
  // skill: skill,
  // doubt: doubt,
  // roomid: roomid,
  useEffect(() => {
    if (tokken) {
      try {
        // Decode the token
        // const token=JSON.stringify(router.query);
        const decodedToken = jwt.decode(tokken);

        // Extract roomId and email from decoded token
        if (decodedToken) {
          const {  email,roomid } = decodedToken;
          setRoom(roomid);
          setEmail(email);
          console.log(roomid);
          console.log(email);
        }
        // console.log("not any ouput tokken "+tokken)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    // console.log("not any ouput tokken "+token);
  }, [router.query]);



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
     
         <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          // onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join the meeting</button>
       
        
      </form>
    </div>
  );
};

export default page;


