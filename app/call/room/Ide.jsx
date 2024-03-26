"use client";
import Codemirror from "codemirror";
import { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { useSocket } from "../../../context/SocketProvider";
import { SocketContext } from '../../../context/SocketProvider';
import { useContext } from "react";
import { useState } from "react";

export default function Ide() {
  const editorRef = useRef(null);
  const socket = useSocket();
  const { codedata, setCodedata } = useContext(SocketContext);
  const [language, setLanguage] = useState("c");

  useEffect(() => {
    function init() {
      if(editorRef.current == null){
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
      editorRef.current.setSize("76vw", "76vh");

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== 'setValue') {
          socket.emit('code-change', { code });
          setCodedata(code);
        }
      });

      socket.on('code-change', ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
          setCodedata(code);
        }
      });
    }
  }

  if (editorRef.current !== null && codedata) {
    editorRef.current.setValue(codedata);
  }

    init();
  }, [editorRef.current]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    if (editorRef.current) {
      editorRef.current.setValue('');
    }
  };

  return (
    <div className=" h-full w-full flex flex-col justify-center items-center">

    <div className=" w-full h-10 z-50 bg-black ">

      <label htmlFor="language" className=" text-white mr-2">Select Language:</label>
        <select onChange={handleLanguageChange} id="language" value={language}>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <div className="text-xl" id="realtimeEditor"></div>
    </div>
  );
}
