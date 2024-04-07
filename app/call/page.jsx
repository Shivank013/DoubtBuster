"use client"

import { useState, useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { SocketContext } from "../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import React, { useRef, } from 'react'

const page = () => {
    const dispatch = useDispatch();
    const {roomid} = useSelector((state) => state.room);
    const {user} = useSelector((state) => state.profile);

    const {setEmail, setRoom} = useContext(SocketContext);
    const router = useRouter();
    const socket = useSocket();

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            setEmail(user.email);
            setRoom(roomid);

            const email = user.email;
            const room = roomid;

            console.log(email, room);
            console.log(email, room);

            console.log("room join karne ke phele ki details ", email, room, socket );

            socket.emit("room:join", { email, room });
        },
        [socket, setEmail, setRoom, user.email, roomid]
    );

    const handleJoinRoom = useCallback(
        (data) => {
            const { email, room } = data;
            console.log(email, room);
            router.push("/call/room");
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
        // Automatically submit the form when the component mounts
        handleSubmitForm({ preventDefault: () => {} });
    }, [handleSubmitForm]);

    return (
        <div>
            <h1>Joining...</h1>
            {/* Remove the submit button from the form */}
            <form>
                {/* <button type="submit">Join the meeting</button> */}
            </form>
        </div>
    );
};

export default page;
