"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../../context/SocketProvider';
import { useContext } from "react";
import { SocketContext } from '../../../context/SocketProvider';

const Board = ({ color, size, eraserstatus }) => {
    const {boarddata, setBoarddata} = useContext(SocketContext);
    const ctxRef = useRef();
    const isDrawingRef = useRef(false);
    const canvasRef = useRef();
    const socket = useSocket();
    const [drawingData, setDrawingData] = useState(null);


    useEffect(() => {

        setDrawingData(boarddata);
        if(boarddata === ""){
            socket.emit("canvas-data", boarddata);
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const sketch_style = getComputedStyle(document.body);

        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        /* Drawing on Paint App */
        ctxRef.current = ctx;

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [boarddata]);

    useEffect(() => {
        const ctx = ctxRef.current;
        console.log("current size: ",size);
        console.log("current color: ",color);
        if (ctx) {
            if (eraserstatus) {
                ctx.lineWidth = size;
                ctx.strokeStyle = '#ffffff'; 
            } else {
                ctx.lineWidth = size;
                ctx.strokeStyle = color;
            }
        }
    }, [color, size, eraserstatus]);

    const handleMouseMove = (e) => {
        if (!isDrawingRef.current) return;
        const ctx = ctxRef.current;
        ctx.lineWidth = size;
        ctx.strokeStyle = eraserstatus ? '#ffffff' : color;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        ctx.lineTo(x, y);
        ctx.stroke();
    };
    
    const handleMouseDown = (e) => {
        isDrawingRef.current = true;
        const ctx = ctxRef.current;
        ctx.lineWidth = size;
        ctx.strokeStyle = eraserstatus ? '#ffffff' : color;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const handleMouseUp = () => {
        isDrawingRef.current = false;
        const canvas = canvasRef.current;
        const base64ImageData = canvas.toDataURL("image/png");
        setDrawingData(base64ImageData);
        setBoarddata(base64ImageData);
        socket.emit("canvas-data", base64ImageData);
    };

    useEffect(() => {
        const receiveCanvasData = (data) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            var image = new Image();
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            };
            image.src = data;
            setBoarddata(data);
        };
        socket.on('canvas-data', receiveCanvasData);

        return () => {
            socket.off('canvas-data', receiveCanvasData);
        };
    }, [socket]);

    useEffect(() => {
        if (drawingData) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
            };
            image.src = drawingData;
        }
    }, [drawingData]);

    return (
        <div className='h-[50%] w-[60%]'>
            <canvas
                ref={canvasRef}
                id="board"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </div>
    );
};

export default Board;