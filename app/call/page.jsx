"use client"

import { useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { SocketContext } from "../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import React from 'react'

function Page() {
    const dispatch = useDispatch();
    const {roomid} = useSelector((state) => state.room);
    const {user} = useSelector((state) => state.profile);

    const {setEmail, setRoom} = useContext(SocketContext);
    const router = useRouter();
    const socket = useSocket();
    const type = "s";

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            setEmail(user.email);
            setRoom(roomid);

            const email = user?.email;
            const room = roomid;

            console.log(email, room);
            console.log(email, room);

            console.log("room join karne ke phele ki details ", email, room, socket );

            socket.emit("room:join", { email, room, type });
        },
        [socket, setEmail, setRoom, user?.email, roomid]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            const { email, room } = data;
            console.log(email, room);
            console.log("ab push hona chaiye")
            router.push("/call/room");
            console.log("ho to gaya th")
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
        socket.on("room:join", handleJoinRoom);
        socket.on("room:full", handleRoomFull);

        return () => {
            socket.off("room:join", handleJoinRoom);
            socket.off("room:full", handleRoomFull);
        };
    }, [socket, handleJoinRoom, handleRoomFull]);

    useEffect(() => {
        handleSubmitForm({ preventDefault: () => {} });
    }, [handleSubmitForm]);

    return (
        <div className=" bg-slate-800  w-[100vw] flex justify-center items-center h-[100vh]">
         <div className=' shadow-2xl flex text-4xl py-20 px-40 text-red-500 font-mono font-semibold flex-col justify-center  bg-black border-2 border-red-800 rounded-2xl'>

         Wait Joining...
          
         </div>
        </div>
    );
};

export default Page;
