"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import jwt from 'jsonwebtoken';
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from "../../../context/SocketProvider";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const {email, setEmail, room, setRoom} = useContext(SocketContext);
    const router = useRouter();
    const {tokken}=useParams();
    const socket = useSocket();
    const tokenRef = useRef(null);
    const [roomf, setroomf] = useState(false);
    const type = "e";

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

        if (!tokenFromStorage) {
            const url = `/call/${tokken}`;
            localStorage.setItem('redirectPath', url);
            window.location.href = "https://doubt-buster.vercel.app/login/expertlogin";
        }
    }, [tokken]);

    const handleSubmitForm = useCallback(
        (e) => {
            toast.loading("Wait Joining...")
            e.preventDefault();
            socket.emit("room:join", { email, room, type });
            toast.dismiss();
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
            setroomf(true);
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
        <div className=" bg-slate-800  w-[100vw] flex justify-center items-center h-[100vh]">
        {
            roomf ? (
                <div className=' shadow-2xl flex py-20 px-40 text-red-500 font-mono font-semibold flex-col justify-center items-center bg-black border-2 border-red-800 rounded-2xl'>
                  <p className=" text-red-500 text-2xl font-medium">Sorry, the doubt has been solved,</p>
                  <p className=" text-red-500 text-2xl font-medium">Gear up for the next one.</p>
                  <a href="https://doubt-buster.vercel.app/" className=" text-center mt-5  bg-red-500 hover:bg-red-700 text-xl font-semibold px-4 py-2 rounded-xl text-white">Go Home</a>
                </div>
            ) : (
                <div className=' shadow-2xl flex py-20 px-40 text-red-500 font-mono font-semibold flex-col justify-center  bg-black border-2 border-red-800 rounded-2xl'>
                  <button className=" bg-red-500 hover:bg-red-700 text-xl font-semibold px-4 py-2 rounded-xl text-white" onClick={handleSubmitForm}>Join Room</button>
                </div>
            )
        }
        </div>
    );
};

export default Page;