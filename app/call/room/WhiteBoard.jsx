"use client";
import React, { useState, useCallback } from 'react';
import Board from './Board';
import { useSocket } from '../../../context/SocketProvider';
import { FaEraser } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useContext } from "react";
import { SocketContext } from '../../../context/SocketProvider';
import { IoMdDownload } from "react-icons/io";
import jsPDF from 'jspdf';

const WhiteBoard = () => {
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState("3");
    const socket = useSocket();
    const [eraserstatus, setEraserstatus] = useState(false);
    const { setBoarddata,boarddata } = useContext(SocketContext);

    const changeColor = useCallback((event) => {
        setColor(event.target.value);
    }, []);

    const eraser = () => {
        setEraserstatus(!eraserstatus);
    };

    const reset = () => {
        setBoarddata("");
    };

    const changeSize = (event) => {
        setSize(event.target.value);
    };

    const inputAlert = () => {
        const userInput = prompt('Please enter the filename for the slide:');
        if (userInput !== null) {
            downloadSlide(userInput);
        }
    };

    const downloadSlide = (fileName) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = boarddata;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0);

            const pdfCanvas = document.createElement('canvas');
            pdfCanvas.width = img.width;
            pdfCanvas.height = img.height;
            const pdfCtx = pdfCanvas.getContext('2d');

            pdfCtx.fillStyle = '#ffffff';
            pdfCtx.fillRect(0, 0, pdfCanvas.width, pdfCanvas.height);

            pdfCtx.drawImage(canvas, 0, 0);

            const imgData = pdfCanvas.toDataURL('image/jpeg', 1.0);

            const pdf = new jsPDF('l', 'mm', 'a4');
            pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save(`${fileName}.pdf`);
        };
    };
    
    return (
        <div className="">
            <div className="tools-section text-center ">

                <div className=' color-picker-container font-bold inline text-white'>
                    Eraser : &nbsp;
                    <button onClick={eraser} className=''><FaEraser/></button>
                </div>

                <div className=' color-picker-container ml-12 font-bold inline text-white'>
                    Brush : &nbsp;
                    <button onClick={eraser} className=''><FaPaintBrush/></button>
                </div>

                <div className="color-picker-container font-bold inline text-white ml-12">
                    Color : &nbsp;
                    <input type="color" className=' h-7 w-7' value={color} onChange={changeColor} />
                </div>

                <div className=" inline text-white font-bold ml-12">
                    Size : &nbsp;
                    <select className='text-black font-semibold' value={size} onChange={changeSize}>
                        <option> 1 </option>
                        <option> 2 </option>
                        <option> 3 </option>
                        <option> 5 </option>
                        <option> 10 </option>
                        <option> 15 </option>
                        <option> 20 </option>
                        <option> 30 </option>
                        <option> 40 </option>
                        <option> 50 </option>
                    </select>
                </div>

                <div className=' color-picker-container font-bold inline ml-12 text-white'>
                    Reset : &nbsp;
                    <button onClick={reset} className=' text-xl mt-2'><GrPowerReset/></button>
                </div>

                <div className=' color-picker-container font-bold inline ml-12 text-white'>
                    Download : &nbsp;
                    <button onClick={inputAlert} className=' text-xl mt-2'><IoMdDownload/></button>
                </div>

            </div>

            <div className="board-container bg-white">
                <Board color={color} size={size} socket={socket} eraserstatus={eraserstatus} />
            </div>
        </div>
    );
};

export default WhiteBoard;