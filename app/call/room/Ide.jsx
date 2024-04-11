"use client"

import React, { useEffect, useRef, useContext, useState } from "react";
import Codemirror from "codemirror";
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from '../../../context/SocketProvider';
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { FaPlay } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import Loader from "./Loader";
import { GrPowerReset } from "react-icons/gr";

export default function Ide() {
  const editorRef = useRef(null);
  const socket = useSocket();
  const { codedata, setCodedata, language, setLanguage } = useContext(SocketContext);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setloader] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = Codemirror(document.getElementById("realtimeEditor"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        width: 500,
        height: 300,
      });

      editorRef.current = editorInstance;
      editorRef.current.setSize("56vw", "79vh");

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const codetxt = instance.getValue();

        const code = { codetxt: codetxt };

        if (origin !== 'setValue') {
          socket.emit('code-change', { code });
          setCodedata(codetxt);
        }
      });

      socket.on('code-change', ({ code }) => {
        if (editorRef.current && code.codetxt !== null) {
          editorRef.current.setValue(code.codetxt);
          setCodedata(code.codetxt);
          if (code.language) {
            setLanguage(code.language);
          }
        }
      });
    }

    if (editorRef.current && codedata) {
      editorRef.current.setValue(codedata);
    }
  }, [editorRef.current]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);

    const code = { codetxt: codedata, language: event.target.value };
    socket.emit('code-change', { code });
  };

  const handelInput = (event) => {
    setInput(event.target.value);
  };

  const handelOutput = (event) => {
    setOutput(event.target.value);
  };

  const compile = async()=> {

    setloader(true);

    let fileName = '';
    switch (language) {
      case 'c':
        fileName = 'main.c';
        break;
      case 'cpp':
        fileName = 'main.cpp';
        break;
      case 'java':
        fileName = 'Main.java';
        break;
      case 'javascript':
        fileName = 'index.js';
        break;
      case 'python':
        fileName = 'main.py';
        break;
      case 'go':
        fileName = 'main.go';
        break;
      default:
        fileName = 'code.txt'; 
    }

      const url = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c1ba07ff67msh52175afc392f645p1aa1b9jsn979223603322',
          'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
        },
        body: JSON.stringify({
          language: language,
          stdin: input,
          files: [
            {
              name: fileName,
              content: codedata
            }
          ]
        })
      };

      console.log(options);

      try {
        const response = await fetch(url, options);
        const resultText = await response.text();
        const resultJSON = JSON.parse(resultText); 
        console.log(resultJSON); 

        if(resultJSON.exception){
          if(resultJSON.exception === null){
            setError(false);
            setOutput(resultJSON.stdout); 
          }
          else{
            setError(true);
            setOutput(resultJSON.exception); 
          }
        }else {
          if(resultJSON.stderr === null){
            setError(false);
            setOutput(resultJSON.stdout); 
          }
          else {
            setError(true);
            setOutput(resultJSON.stderr); 
          }
        }

      } catch (error) {
        console.error(error);
        setOutput(error)
      }
      setloader(false);
  }


  const inputAlert = () => {
    const userInput = prompt('Please enter the filename:');
    if (userInput !== null) {
      download(userInput);
    }
  };

  const download = (fileName) => {
    let fileExtension = '';
  
    switch (language) {
      case 'c':
        fileExtension = '.c';
        break;
      case 'cpp':
        fileExtension = '.cpp';
        break;
      case 'java':
        fileExtension = '.java';
        break;
      case 'javascript':
        fileExtension = '.js';
        break;
      case 'python':
        fileExtension = '.py';
        break;
      case 'go':
        fileExtension = '.go';
        break;
      default:
        fileExtension = '.txt'; 
    }
  
    const fileNameWithExtension = `${fileName}${fileExtension}`;
  
    const blob = new Blob([codedata], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNameWithExtension;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const reset = ()=> {
    setInput("");
    setOutput("");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">

      <div className="w-full h-10 z-50 py-2 flex items-center ">
        <label htmlFor="language" className="text-white ml-5 text-md font-semibold mr-2">Select Language:</label>
        <select className="pl-1 rounded-md" onChange={handleLanguageChange} id="language" value={language}>
          <option value="c">c</option>
          <option value="cpp">cpp</option>
          <option value="java">java</option>
          <option value="javascript">javascript</option>
          <option value="python">python</option>
          <option value="go">go</option>
        </select>

        <button onClick={reset} className=" text-slate-200 text-xl shadow-2xl shadow-white ml-12"><GrPowerReset/></button>

        <button onClick={inputAlert} className=" text-slate-200 text-xl shadow-2xl shadow-white ml-12"><IoSaveSharp/></button>

        <button onClick={compile} className=" text-green-500 text-xl shadow-2xl shadow-white ml-12"> {loading ? <Loader/> : <FaPlay/>}</button>

      </div>

      <div className="w-full flex justify-center items-center">
        <div className="text-xl z-30" id="realtimeEditor"></div>

        <div className=" bg-black flex flex-col justify-between w-[20vw] h-[79vh] z-30">
          <label className="text-white font-semibold text-xl ml-2">Input:</label>
          <textarea value={input} onChange={handelInput} className="p-1 text-base text-white w-[19vw] bg-black mx-2 mb-2 border-2 rounded-lg h-full"></textarea>

          <label className="text-white font-semibold text-xl ml-2">Output:</label>
          <textarea value={output} readOnly onChange={handelOutput} className={`p-1 text-base ${error ? 'text-red-500' : 'text-white'} w-[19vw] bg-black mx-2 mb-10 border-2 rounded-lg h-full`} ></textarea>
        </div>
      </div>

    </div>
  );
}