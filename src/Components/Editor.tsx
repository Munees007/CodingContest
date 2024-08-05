import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import React, { useState } from "react";
import DropDown from "./DropDown";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'
import { MdPlayArrow } from "react-icons/md";
interface EditorProps {
  ExecuteCode: (code: string, language: string, file: string) => void;
  Result: any;
}

const Editor: React.FC<EditorProps> = ({ ExecuteCode, Result }) => {
  const [code, setCode] = useState<string>("");
  const [theme, SetTheme] = useState<string>("");
  const [language, SetLanguage] = useState<string>("");
  const runCode = () => {
    code !==""? 
    ExecuteCode(code, language, "main." + language) : toast.error("Type something");
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
  };
  const handleLanguage = (value: string) => {
    SetLanguage(value);
  };
  return (
    <div className={`ace-${theme ? theme : "dracula"} relative h-screen p-5 overflow-hidden`}>
      <div className="flex gap-4">
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
        <div  className="absolute right-10 top-3">
            <MdPlayArrow onClick={runCode} title="Run" size={35} className="cursor-pointer hover:scale-105 active:scale-90"/>
        </div>
      </div>
      <div className="flex w-full gap-4 mt-3">
        <div className="border-2 w-fit mt-2 rounded-sm resize-x">
          <AceEditor
            mode={`${language === "cpp" ? "c_cpp" : language}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            theme={`${theme ? theme : "dracula"}`}
            width="45rem"
            showPrintMargin={false}
            fontSize={20}
            onChange={(e) => {
                language ?
              setCode(e) : toast.warning("Please Choose the language")
            }}
          />
        </div>
        <div className="border-2 w-full mt-2 p-2">
          <p>Output:</p>
          <p className="whitespace-pre">{Result?.result?.output}</p>
        </div>
      </div>
      <div className="flex  items-center absolute right-3 bottom-3 px-5 gap-5 rounded-md border-2">
        <img src="./src/assets/images/MwLogo.png" className="w-14"></img>
        <div className="flex flex-col items-center">
        <p className="">Developed by</p>
        <p>P. Muneeswaran,</p>
        <p>III BCA B.</p>
        {/* <p>Chairman of the Softech Association.</p> */}
        </div>
      </div>
      <ToastContainer position="top-center" stacked/>
    </div>
  );
};

export default Editor;
