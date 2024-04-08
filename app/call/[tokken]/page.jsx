"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import jwt from 'jsonwebtoken';
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from "../../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";

const Page = () => {
    const {email, setEmail, room, setRoom} = useContext(SocketContext);
    const router = useRouter();
    const {tokken}=useParams();
    const socket = useSocket();
    const tokenRef = useRef(null);

const page = () => {


  const {email, setEmail, room, setRoom} = useContext(SocketContext);
  const router = useRouter();
  const {tokken}=useParams();
  // const url=useParams();
  const socket = useSocket();
  // const route=useRouter();
  // let flag = 5
  // useEffect(()=>{
  //   console.log("first");
  //   const token = localStorage.getItem('user');
  //   console.log("it is tokken "+ token);
 
  // if (!token ) {
  //   console.log("first");
  //   const url=  `/call/${tokken}`;
  //   localStorage.setItem('redirectPath', url);
  //   // const ans=localStorage.getItem('redirectPath');
  //   // console.log(ans);
  
  //   route.push("/login");
  //   console.log("first");
     
  // }

  // },[])
  let token = null;


  useEffect(() => {
    console.log("first");
    // const token = localStorage.getItem('token');
    if (typeof window !== 'undefined') {

      token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
      
    }
    console.log("it is token " + token);

    if (!token ) {
      console.log("first");
      
      const url = `/call/${tokken}`;
      if(typeof window !== 'undefined'){
      localStorage.setItem('redirectPath', url);
      }
      router.push("/login");
     

    }
  }, []);

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
      let rem=null;
      if (typeof window !== 'undefined') {
      rem= localStorage.getItem('redirectPath');
      }
      if(rem){
      localStorage.removeItem('redirectPath'); 
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
 
  useEffect(() => {
    if (tokken) {
      try {
        
        const decodedToken = jwt.decode(tokken);

        
        if (decodedToken) {
          const {  email,roomid } = decodedToken;
          setRoom(roomid);
          setEmail(email);
          console.log(roomid);
          console.log(email);
        }

        if (!tokenRef.current) {
            const url = `/call/${tokken}`;
            if (typeof window !== 'undefined') {
                localStorage.setItem('redirectPath', url);
            }
            router.push("/login");
        }
    }, [tokken, router]);

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
            router.push("/call/room");
            if (typeof window !== 'undefined') {
                let rem = localStorage.getItem('redirectPath');
                if (rem) {
                    localStorage.removeItem('redirectPath');
                }
            }
        },
        [router]
    );

    const handleRoomFull = useCallback(
        async (message) => {
            console.log("Sorry Room Full");
            console.log(message);
        },
        []
    );

    useEffect(() => {
        if (tokken) {
            try {
                const decodedToken = jwt.decode(tokken);
                if (decodedToken) {
                    const { email, roomid } = decodedToken;
                    setRoom(roomid);
                    setEmail(email);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [tokken, setEmail, setRoom]);

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        socket.on("room:full" , handleRoomFull);
        return () => {
            socket.off("room:join", handleJoinRoom);
            socket.off("room:full" , handleRoomFull);
        };
    }, [socket, handleJoinRoom, handleRoomFull]);

    return (
        <div>
            <h1>Lobby</h1>
            <p>Email ID</p>
            <input
                type="email"
                id="email"
                value={email}
                readOnly
            />
            <p>Room Number</p>
            <input
                type="text"
                id="room"
                value={room}
                readOnly
            />
            <br />
            <button onClick={handleSubmitForm}>Join the meeting</button>
        </div>
    );
};

export default Page;
