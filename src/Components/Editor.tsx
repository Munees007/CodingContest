import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'
import { VscPlay } from "react-icons/vsc";
import { VscSave } from "react-icons/vsc";

interface EditorProps {
  ExecuteCode: (code: string, language: string, file: string) => void;
  Result: any;
  questionNo:number;
}

const Editor: React.FC<EditorProps> = ({ ExecuteCode, Result,questionNo }) => {
  const [code, setCode] = useState<string>(()=>{
    return localStorage.getItem(questionNo.toString()) || "";
  });
  const [theme, SetTheme] = useState<string>("");
  const [language, SetLanguage] = useState<string>("");
  const runCode = () => {
    if (code !== "") {
      ExecuteCode(code, language, "main." + language);
    } else {
      toast.error("Type something");
    }
  };
  const themes = [
    { label: "Twilight", value: "twilight" },
    { label: "Clouds", value: "clouds" },
    { label: "Dawn", value: "dawn" },
    { label: "Dracula", value: "dracula" },
    { label: "Ambiance", value: "ambiance" },
    { label: "DreamWeaver", value: "dreamweaver" },
    { label: "Chaos", value: "chaos" },
    { label: "Cobalt", value: "cobalt" },
    { label: "Eclipse", value: "eclipse" },
    { label: "GruvBox", value: "gruvbox" },
    { label: "Gob", value: "gob" },
    { label: "Monokai", value: "monokai" },
  ];
  const languages = [
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
  ];

  const handleTheme = (value: string) => {
    SetTheme(value);
    localStorage.setItem('theme',value);
  };
  const handleLanguage = (value: string) => {
    SetLanguage(value);
  };
  const handleSave = ()=>{
    if(code === "") {toast.error("Please Type Program Before Saving"); return} 
    localStorage.setItem(questionNo.toString(),code);
    toast.success("Saved Successfully");
  }
  useEffect(()=>{
    const storedCode = localStorage.getItem(questionNo.toString()) || "";
    setCode(storedCode);
  },[questionNo])
  return (
    <div className={`ace-${theme ? theme : "dracula"} relative h-screen p-5 overflow-hidden`}>
      <p className="text-4xl font-bold text-center">CODING CONTEST</p>

      <div className="flex gap-4 mt-6">
        <DropDown
          options={themes}
          onSelect={handleTheme}
          theme={theme}
          condition={"Theme"}
        />
        <DropDown
          options={languages}
          onSelect={handleLanguage}
          theme={theme}
          condition={"Language"}
        />
        <p className="text-center  text-xl font-bold  ">QUESTION: {questionNo}</p>
        <div className="absolute right-10 top-22 flex">
          <VscSave onClick={handleSave} title="Save" size={30} className="mr-4 cursor-pointer hover:scale-105 active:scale-90" />
          <VscPlay onClick={runCode} title="Run" size={30} className="cursor-pointer hover:scale-105 active:scale-90" />
        </div>
      </div>
      <div className="flex w-full gap-4 mt-7">
        <div className="w-fit mt-2   rounded-sm resize-x">
          <AceEditor
            mode={`${language === "cpp" ? "c_cpp" : language}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            theme={`${theme ? theme : "dracula"}`}
            width="45rem"
            height="30rem"
            style={{border:"2px solid",borderRadius:"8px"}}
            showPrintMargin={false}
            className="shadow-md shadow-gray-500"
            fontSize={20}
            value={code}
            onChange={(e) => {
              language ?
                setCode(e) : toast.warning("Please Choose the language")
            }}
          />
        </div>
        <div style={{border:"2px solid",borderRadius:"8px"}} className={` w-full mt-2 h-[30rem] p-2 overflow-y-auto shadow-md shadow-gray-500`}>
          <p className="text-2xl font-serif font-bold">Output:</p>
          <p className="whitespace-pre mt-4 ml-4 font-mono text-xl">{!Result ? "": Result }</p>
        </div>
      </div>
      <div className="flex w-full">
      <div className="flex w-full mt-6">
        <div className="flex  items-center w-fit z-40  px-5 gap-5 rounded-md border-2">
          <img src="./src/assets/images/MwLogo.png" className="w-14"></img>
          <div className="flex flex-col items-center">
            <p className="">Organised by</p>
            <p>R. Karthik Balan,</p>
            <p>III BCA B.</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end mt-6">
        <div className="flex  items-center w-fit z-40  px-5 gap-5 rounded-md border-2">
          <img src="./src/assets/images/MwLogo.png" className="w-14"></img>
          <div className="flex flex-col items-center">
            <p className="">Developed by</p>
            <p>P. Muneeswaran,</p>
            <p>III BCA B.</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>
      </div>

      <ToastContainer position="top-right" stacked />
    </div>
  );
};

export default Editor;
