"use client"

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import jwt from 'jsonwebtoken';
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from "../../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import React from 'react'

const Page = () => {
    const {email, setEmail, room, setRoom} = useContext(SocketContext);
    const router = useRouter();
    const {tokken}=useParams();
    const socket = useSocket();
    let token = null;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
        }

        if (!token) {
            const url = `/call/${tokken}`;
            if (typeof window !== 'undefined') {
                localStorage.setItem('redirectPath', url);
            }
            router.push("/login");
        }
    }, []);

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
        []
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
    }, [tokken]);

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
