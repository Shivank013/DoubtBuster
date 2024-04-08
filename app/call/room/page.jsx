"use client"

import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../../services/peer";
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from "../../../context/SocketProvider";
import { useContext } from "react";
import { useRouter } from 'next/navigation'
import { LuPhoneCall } from "react-icons/lu";
import { SlCallEnd } from "react-icons/sl";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { RiFullscreenFill } from "react-icons/ri";
import { RiFullscreenExitFill } from "react-icons/ri";
import { LuScreenShare } from "react-icons/lu";
import { LuScreenShareOff } from "react-icons/lu";
import { TbChalkboardOff } from "react-icons/tb";
import { TbChalkboard } from "react-icons/tb";
import { TbCodeOff } from "react-icons/tb";
import { TbCode } from "react-icons/tb";
import Chat from "./Chat";
import screenfull from "screenfull";
import WhiteBoard from "./WhiteBoard";
import Ide from "./Ide";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [roomCreator, setRoomCreator] = useState();
  const [calldone, setCalldone] = useState(false);
  const [start, setStart] = useState(false);
  const { room } = useContext(SocketContext);
  const router = useRouter();
  const [callend, setCallend] = useState(false);
  const [vedio, setVedio] = useState(false);
  const [audio, setAudio] = useState(true);
  const [remoteVedio, setRemoteVedio] = useState(false);
  const [remoteAudio, setRemoteAudio] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [screenshare, setScreenshare] = useState(false);
  const [board, setBoard] = useState(false);
  const [code, setCode] = useState(false);
  const [youPresent, setYouPresent] = useState(false);
  const [ownScreen, setOwnScreen] = useState();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setCalldone(true);
  }, [remoteSocketId, socket]);

  // Other callback functions and useEffect hooks...

  const handleScreenShareOff = useCallback(async () => {
    if (youPresent) {
      console.log("Calling screen share off");
  
      const videoTracks = myStream?.getVideoTracks();
      const videoTrack = videoTracks && videoTracks.length > 0 ? videoTracks[0] : null;
  
      console.log("Video track:", videoTrack);
  
      const senders = peer.peer.getSenders();
      console.log("Senders:", senders);
  
      if (videoTrack) {
        const sender = senders[1];
  
        console.log("Sender:", senders[1]);
  
        if (senders[1]) {
          const screenShareTrack = senders[1].track;
          screenShareTrack.stop();
  
          sender.replaceTrack(videoTrack);
  
          socket.emit("screenshare:status", { status: false, room });
          setCode(false);
          setBoard(false);
          setScreenshare(false);
          setYouPresent(false);
        } else {
          console.error("Sender not found");
        }
      } else {
        console.error("Video track not found in myStream");
      }
    } else if (screenshare) {
      alert("You are not presenting");
    }
  }, [youPresent, screenshare, myStream, socket, room]);

  useEffect(() => {
    socket.on("screenshare:status", (data) => {
      const { status } = data;
      if (status) {
        handleScreenShareOn();
      } else {
        handleScreenShareOff();
      }
    });

    return () => {
    };
  }, [
    handleScreenShareOn,
    handleScreenShareOff,
    socket,
    room
  ]);

  // Other useEffect hooks...

  return (
    <div className=" p-5 flex flex-col overflow-hidden  items-center h-screen w-screen bg-slate-700">
      {/* Render content */}
    </div>
  );
};

export default RoomPage;
